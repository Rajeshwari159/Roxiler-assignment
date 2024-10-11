import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function BarChart() {
  const navigate = useNavigate();
  const [priceRangesData, setPriceRangesData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/barChart?month=${selectedMonth}`
      );
      setPriceRangesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: priceRangesData.map((range) => range.range),
    datasets: [
      {
        label: "Number of Items",
        data: priceRangesData.map((range) => range.count),
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#3b82f6",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [8, 4],
        },
        ticks: {
          color: "#3b82f6",
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-6">
      
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-all duration-500">
        <h2 className="text-4xl font-bold mb-8 text-indigo-800">
          Price Range Distribution
        </h2>

        <div className="flex justify-center mb-8">
          <select
            className="p-3 bg-blue-100 border-2 border-blue-300 focus:border-blue-500 focus:outline-none rounded-lg shadow-md text-lg text-blue-700 cursor-pointer transition-colors"
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
          className="mb-8 px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-colors"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>

        <div className="relative w-full h-96 p-4 bg-blue-50 rounded-lg shadow-md">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
