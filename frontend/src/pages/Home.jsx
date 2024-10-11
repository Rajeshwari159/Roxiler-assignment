import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api/initialize-database');
    if (response) {
      alert("Database initialized successfully!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-8">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-500">
        <h1 className="text-6xl font-bold text-indigo-800 mb-4">Transaction Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Explore data visualizations, statistics, and transaction insights.</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-6 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Transactions Table</h2>
            <button
              className="w-full bg-indigo-600 py-3 px-6 rounded-lg font-medium"
              onClick={() => navigate("/table")}
            >
              View Table
            </button>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <button
              className="w-full bg-blue-600 py-3 px-6 rounded-lg font-medium"
              onClick={() => navigate("/stats")}
            >
              View Stats
            </button>
          </div>

          <div className="p-6 bg-gradient-to-r from-green-400 to-green-500 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
            <button
              className="w-full bg-green-600 py-3 px-6 rounded-lg font-medium"
              onClick={() => navigate("/bar")}
            >
              View Bar Chart
            </button>
          </div>

          <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
            <button
              className="w-full bg-yellow-600 py-3 px-6 rounded-lg font-medium"
              onClick={() => navigate("/pie")}
            >
              View Pie Chart
            </button>
          </div>

          <div className="p-6 bg-gradient-to-r from-red-400 to-red-500 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Initialize Database</h2>
            <button
              className="w-full bg-red-600 py-3 px-6 rounded-lg font-medium"
              onClick={fetchData}
            >
              Initialize
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        © {new Date().getFullYear()} Your Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}
