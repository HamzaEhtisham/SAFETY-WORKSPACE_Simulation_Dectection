import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function QuizModal({ topic, onClose, onSubmit }) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Reset quiz state when a new topic is passed
    setCurrentPromptIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  }, [topic]);

  if (!topic || !topic.prompts || topic.prompts.length === 0) {
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="relative bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">No Quiz Available</h2>
          <p>There are no prompts for this topic yet.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    );
  }

  const currentPrompt = topic.prompts[currentPromptIndex];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentPrompt.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);

    if (currentPromptIndex < topic.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = () => {
    // Final score calculation if the last question was answered
    if (selectedAnswer === currentPrompt.correctAnswer) {
      setScore(score + 1);
    }
    onSubmit(score, topic.prompts.length);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 text-white overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quiz: {topic.title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {!quizCompleted ? (
          <div className="space-y-4">
            <div className="bg-slate-800/40 p-4 rounded-lg">
              <div className="font-medium mb-2">
                {currentPromptIndex + 1}. {currentPrompt.question}
              </div>
              <div className="grid gap-2">
                {currentPrompt.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`text-left px-3 py-2 rounded-md border transition ${
                      selectedAnswer === index
                        ? "border-emerald-500 bg-emerald-800/30"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50"
              >
                {currentPromptIndex < topic.prompts.length - 1 ? "Next Prompt" : "Finish Quiz"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-xl">Your score: {score} out of {topic.prompts.length}</p>
            <button
              onClick={handleSubmitQuiz}
              className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-lg"
            >
              Submit Score
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}