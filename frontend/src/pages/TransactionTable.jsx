import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionTable() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, [page, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/data/transactions?page=${page}&perPage=${perPage}&search=${search}`
      );
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 p-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10 hover:scale-105 transition-all duration-500 ease-in-out">
        <h1 className="text-5xl font-bold mb-10 text-center text-purple-800">
          Product Transactions
        </h1>

        <div className="flex justify-between items-center mb-8">
          <button
            className="px-8 py-3 bg-purple-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors focus:outline-none"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="border border-gray-300 focus:border-purple-400 focus:ring-purple-300 rounded-lg px-4 py-2 w-full max-w-xs transition-colors shadow-sm"
          />

          <div className="flex space-x-2">
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
              className={`px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md transition-opacity ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"}`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        <div className="overflow-auto max-h-96 rounded-lg shadow-inner">
          <table className="w-full text-center border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-4 px-6 border-b border-purple-200">ID</th>
                <th className="py-4 px-6 border-b border-purple-200">Image</th>
                <th className="py-4 px-6 border-b border-purple-200">Title</th>
                <th className="py-4 px-6 border-b border-purple-200">Description</th>
                <th className="py-4 px-6 border-b border-purple-200">Price</th>
                <th className="py-4 px-6 border-b border-purple-200">Sold</th>
                <th className="py-4 px-6 border-b border-purple-200">Date of Sale</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-purple-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-purple-100">
                      {transaction.id}
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      {transaction.title}
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      {transaction.description}
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      ${transaction.price}
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      {transaction.sold ? "Yes" : "No"}
                    </td>
                    <td className="py-4 px-6 border-b border-purple-100">
                      {new Date(transaction.dateOfSale).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="py-6 px-6 text-center text-gray-500"
                    colSpan="7"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
