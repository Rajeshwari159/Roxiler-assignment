import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(PieController, ArcElement);

export default function PieChart() {
  const navigate = useNavigate();
  const [pieChartData, setPieChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/pieChart?month=${selectedMonth}`
      );
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = {
    labels: pieChartData.map((data) => data.category),
    datasets: [
      {
        label: "Number of Items",
        data: pieChartData.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 p-8">
      
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-all duration-500">
        
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-800">
          Sales Distribution by Category
        </h2>

        <div className="flex justify-center mb-8">
          <select
            className="p-4 bg-indigo-100 border-2 border-purple-300 focus:border-indigo-500 focus:outline-none rounded-lg shadow-md text-lg text-indigo-700 cursor-pointer transition-colors"
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

        <button
          className="mb-8 px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>

        <div className="relative w-full h-96 p-6 bg-indigo-50 rounded-lg shadow-md">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
