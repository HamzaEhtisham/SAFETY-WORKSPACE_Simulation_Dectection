import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const usersResponse = await axios.get(
          "http://127.0.0.1:5000/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data);

        const quizAttemptsResponse = await axios.get(
          "http://127.0.0.1:5000/admin/quiz_attempts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuizAttempts(quizAttemptsResponse.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
        setError("Failed to load admin data. Please try again.");
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleDeleteUser = async (username) => {
    const token = localStorage.getItem("token");
    if (
      !window.confirm(`Are you sure you want to delete user "${username}"?`)
    ) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/admin/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.username !== username));
      setQuizAttempts(
        quizAttempts.filter((attempt) => attempt.username !== username)
      );
    } catch (err) {
      console.error("Failed to delete user", err);
      setError("Failed to delete user. Please try again.");
    }
  };

  const generateReport = (user) => {
    const doc = new jsPDF();
    const userQuizAttempts = quizAttempts.filter(
      (attempt) => attempt.username === user.username
    );

    doc.text(`Progress Report for ${user.username}`, 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Topic", "Score", "Date"]],
      body: userQuizAttempts.map((attempt) => [
        attempt.topic,
        attempt.score,
        new Date(attempt.date).toLocaleDateString(),
      ]),
    });

    doc.save(`progress-report-${user.username}.pdf`);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center text-slate-100">
        Loading admin data...
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
      <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white">
          Admin Panel
        </h2>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-400 border-b border-indigo-400 pb-2">
            Users
          </h3>
          {users.length === 0 ? (
            <p className="text-slate-400">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="bg-slate-700/40 rounded-lg p-4 shadow-md"
                >
                  <p className="text-lg font-medium">
                    Username:{" "}
                    <span className="text-white">{user.username}</span>
                  </p>
                  <p className="text-slate-300">
                    Email: <span className="text-white">{user.email}</span>
                  </p>
                  <p className="text-slate-300">
                    Role: <span className="text-white">{user.role}</span>
                  </p>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-emerald-400">
                      Quiz Attempts
                    </h4>
                    {quizAttempts.filter(
                      (attempt) => attempt.username === user.username
                    ).length === 0 ? (
                      <p className="text-slate-400">
                        No quiz attempts found for this user.
                      </p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {quizAttempts
                          .filter(
                            (attempt) => attempt.username === user.username
                          )
                          .map((attempt, idx) => (
                            <li key={idx} className="text-slate-300">
                              {attempt.topic}: {attempt.score}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleDeleteUser(user.username)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => generateReport(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
