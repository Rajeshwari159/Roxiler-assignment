import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-all duration-500">
        
        <h2 className="text-4xl font-bold mb-10 text-center text-indigo-800">
          Statistics for Selected Month
        </h2>

        <div className="flex justify-center mb-10">
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

        {statistics && (
          <div className="overflow-auto max-h-96">
            <table className="w-full text-center border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-4 px-6">Total Sale Amount</th>
                  <th className="py-4 px-6">Total Sold Items</th>
                  <th className="py-4 px-6">Total Not Sold Items</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-indigo-50 hover:bg-indigo-100 transition-colors">
                  <td className="border-b border-gray-200 py-4 px-6 text-indigo-800 font-semibold">
                    ${statistics.totalSaleAmount}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-6 text-indigo-800 font-semibold">
                    {statistics.totalSoldItems}
                  </td>
                  <td className="border-b border-gray-200 py-4 px-6 text-indigo-800 font-semibold">
                    {statistics.totalNotSoldItems}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
