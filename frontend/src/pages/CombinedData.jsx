import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function CombinedData() {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/combinedData?month=${selectedMonth}`
      );
      console.log("Fetched data:", response.data); // Log fetched data
      setCombinedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fallback data to ensure charts have at least some data to display
  const barChartData = {
    labels: combinedData?.barChartData?.labels || ["No Data"],
    datasets: [
      {
        label: "Bar Chart",
        data: combinedData?.barChartData?.values || [0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: combinedData?.pieChartData?.labels || ["No Data"],
    datasets: [
      {
        label: "Pie Chart",
        data: combinedData?.pieChartData?.values || [1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-indigo-700">Combined Data Overview</h2>
          <button
            className="px-5 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>

        <div className="flex items-center mb-12">
          <label htmlFor="month" className="mr-4 text-xl font-medium text-gray-700">
            Select Month:
          </label>
          <select
            id="month"
            className="p-3 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow-sm transition duration-150 ease-in-out"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>

        {combinedData ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Bar Chart */}
            <div className="bg-blue-50 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Bar Chart Data</h3>
              <div style={{ width: "100%", height: "300px" }}>
                <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-blue-50 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Pie Chart Data</h3>
              <div style={{ width: "100%", height: "300px" }}>
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Statistics Data */}
            <div className="col-span-1 md:col-span-2 bg-blue-50 p-6 rounded-md shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Statistics Data</h3>
              <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-auto">
                {JSON.stringify(combinedData.statisticsData, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
}
