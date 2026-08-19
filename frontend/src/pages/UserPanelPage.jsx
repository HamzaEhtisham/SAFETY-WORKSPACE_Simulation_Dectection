import React, { useEffect, useState } from "react";
import UserPanel from "../components/UserPanel";
import { useNavigate } from "react-router-dom";
import { topicsData } from "../data/topicsData";

export default function UserPanelPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressAndTopics = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Use the directly imported topicsData
        const allAvailableTopics = topicsData;

        // Fetch user progress
        const progressResponse = await fetch("/api/user_progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!progressResponse.ok) {
          if (progressResponse.status === 401) {
            navigate("/login");
          }
          throw new Error(
            `HTTP error! status: ${progressResponse.status} from /user_progress`,
          );
        }
        const userProgress = await progressResponse.json();

        // Create a map for easy lookup of user attempts by topic title
        const attemptedTopicsMap = new Map();
        userProgress.forEach((attempt) => {
          attemptedTopicsMap.set(attempt.topic, attempt);
        });

        // Merge all available topics with user's progress
        const mergedTopics = allAvailableTopics.map((topic) => {
          const userAttempt = attemptedTopicsMap.get(topic.title);
          // Use topic.totalQuestions from the fetched allAvailableTopics
          const totalQuestions = topic.totalQuestions || 10; // Fallback to 10 if not defined

          return {
            id: topic.id,
            title: topic.title,
            attempted: !!userAttempt,
            score: userAttempt ? `${userAttempt.score}/10` : `0/10`,
            totalQuestions: totalQuestions,
          };
        });

        setTopics(mergedTopics);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressAndTopics();
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center text-slate-100">
        Loading user progress...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Progress</h1>
        <UserPanel topics={topics} />
      </div>
    </div>
  );
}
