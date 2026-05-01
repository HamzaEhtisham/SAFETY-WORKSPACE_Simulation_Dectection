import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import QuizModal from "../components/quiz";
import { topicsData } from "../data/topicsData";
import {
  phishingQuizTopics,
  phishingAttackCategories,
} from "../data/phishingQuizdata";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.mjs";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I'm your phishing awareness assistant. Ask me anything about phishing or cybersecurity!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const userInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CHATBOT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a friendly chatbot that explains phishing and online safety clearly and concisely.",
            },
            { role: "user", content: userInput },
          ],
        }),
      });

      const data = await res.json();
      const botReply =
        data?.choices?.[0]?.message?.content ||
        "⚠️ Sorry, I couldn't get a response.";

      setMessages((m) => [...m, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((m) => [
        ...m,
        { from: "bot", text: "❌ Network or API error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      <style>{`
        .chatbot-messages::-webkit-scrollbar {
          width: 10px;
        }
        .chatbot-messages::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 5px;
        }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 5px;
        }
        .chatbot-messages::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>

      <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-3 flex-shrink-0">
        <MessageSquare size={18} />
        <h3 className="font-semibold">Simulator Chatbot</h3>
      </div>

      <div
        ref={listRef}
        className="chatbot-messages flex-1 p-4 space-y-3 min-h-0"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "thin",
          scrollbarColor: "#475569 #1e293b",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-full ${
              m.from === "bot" ? "text-left" : "text-right"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg text-sm ${
                m.from === "bot"
                  ? "bg-slate-700 text-slate-100"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left text-slate-400 text-sm animate-pulse">
            💬 Typing...
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-700 flex-shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none"
            placeholder="Ask the chatbot..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PhishingSimulator({ sidebarOpen, setSidebarOpen }) {
  const { topicId, subTopicId } = useParams();
  const [currentTopic, setCurrentTopic] = useState(null);
  const [quizTopics, setQuizTopics] = useState([]);
  const [pageImages, setPageImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  useEffect(() => {
    let topic;
    let quizData;

    if (subTopicId) {
      const mainTopic = topicsData.find((t) => t.id === parseInt(topicId));
      topic = mainTopic?.subtopics.find((st) => st.id === subTopicId);

      const category = phishingAttackCategories.find(
        (c) => c.title === mainTopic.title
      );
      quizData = category?.subtopics.find((st) => st.name === topic.title);
    } else {
      topic = topicsData.find((t) => t.id === parseInt(topicId));
      quizData = phishingQuizTopics.find((qt) => qt.id === `topic_${topicId}`);
    }

    if (topic) {
      setCurrentTopic(topic);
      if (quizData) {
        setQuizTopics([
          {
            id: quizData.id || topic.id,
            title: quizData.title || topic.title,
            prompts: quizData.prompts,
            attempted: false,
            score: null,
          },
        ]);
      } else {
        setQuizTopics([]);
      }
    }
  }, [topicId, subTopicId]);

  useEffect(() => {
    const renderPdfToImages = async () => {
      if (currentTopic && currentTopic.slidePath) {
        setIsLoadingPdf(true);
        const pdf = await pdfjsLib.getDocument(currentTopic.slidePath).promise;
        const images = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport: viewport })
            .promise;
          images.push(canvas.toDataURL());
        }
        setPageImages(images);
        setIsLoadingPdf(false);
      }
    };
    renderPdfToImages();
  }, [currentTopic]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const [activeQuizTopic, setActiveQuizTopic] = useState(null);
  const [result, setResult] = useState(null);

  function openQuiz(topicId) {
    const t = quizTopics.find((tt) => tt.id === topicId);
    setActiveQuizTopic(t);
  }

  async function handleQuizSubmit(score) {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user is not authenticated.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/save_quiz_attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: activeQuizTopic.title,
          score: score,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save quiz attempt.");
      }

      const result = await response.json();
      console.log("Quiz attempt saved:", result);

      setQuizTopics((prev) =>
        prev.map((t) =>
          t.id === activeQuizTopic.id
            ? { ...t, attempted: true, score: `${score}/10` }
            : t
        )
      );
      setResult({ topic: activeQuizTopic.title, score: `${score}/10` });
      setActiveQuizTopic(null);
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }
  }

  if (!currentTopic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 relative">
      <div
        className={`max-w-7xl mx-auto grid transition-all duration-500 ${
          sidebarOpen ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-[1fr_0px]"
        } gap-6`}
      >
        {/* MAIN PANEL */}
        <div className="flex flex-col gap-4">
          {/* Slides */}
          <div
            className="bg-slate-800/40 rounded-2xl p-6 shadow-lg flex-col"
            style={{ display: "flex", height: "100%" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{currentTopic.title}</h1>
            </div>

            {currentTopic.slidePath ? (
              <div className="flex-1">
                {isLoadingPdf ? (
                  <div>Loading PDF...</div>
                ) : (
                  <>
                    {pageImages.length > 0 && (
                      <img
                        src={pageImages[pageNumber - 1]}
                        alt={`Page ${pageNumber}`}
                      />
                    )}
                    <div className="flex justify-center items-center mt-4">
                      <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                        className="p-2 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <p className="mx-4">
                        Page {pageNumber} of {pageImages.length}
                      </p>
                      <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= pageImages.length}
                        className="p-2 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <p>No slides available for this topic.</p>
              </div>
            )}
          </div>

          {/* Quizzes */}
          <div className="bg-slate-800/30 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Quiz</h3>
              <div className="text-sm text-slate-400">
                Attempt the quiz for this topic
              </div>
            </div>

            {quizTopics.length > 0 ? (
              <div
                key={quizTopics[0].id}
                className="bg-slate-900/40 rounded-lg p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="font-medium">{quizTopics[0].title}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Prompts: {quizTopics[0].prompts.length}
                  </div>
                  <div className="text-sm text-emerald-400 mt-2">
                    {quizTopics[0].attempted
                      ? `Score: ${quizTopics[0].score}`
                      : "Not attempted"}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => openQuiz(quizTopics[0].id)}
                    className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Attempt
                  </button>
                  {quizTopics[0].attempted && (
                    <span className="text-sm text-slate-400">Attempted ✓</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-slate-400">
                No quiz available for this topic.
              </div>
            )}

            {result && (
              <div className="mt-4 text-sm text-emerald-300">
                Last result: <strong>{result.topic}</strong> — {result.score}
              </div>
            )}
          </div>
        </div>

        {/* Chatbot Sidebar */}
        <aside
          className={`bg-slate-800/40 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-500 h-[calc(100vh-160px)] sticky top-28 ${
            sidebarOpen ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
          {sidebarOpen && (
            <>
              <div className="p-4 border-b border-slate-700 space-y-2 flex-shrink-0">
                <button
                  onClick={() => (window.location.href = "/user-panel")}
                  className="block w-full text-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                >
                  View User Panel
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition"
                >
                  Logout
                </button>
              </div>
              <Chatbot />
            </>
          )}
        </aside>
      </div>

      {/* Quiz Modal */}
      {activeQuizTopic && (
        <QuizModal
          topic={activeQuizTopic}
          onClose={() => setActiveQuizTopic(null)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
}
