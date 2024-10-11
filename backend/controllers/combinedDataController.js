import axios from "axios";

export const combinedData = async (req, res) => {
  try {
    const month = req.query.month;
    const [barChartData, pieChartData, statisticsData] = await Promise.all([
      axios.get(`http://localhost:8080/charts/barChart?month=${month}`),
      axios.get(`http://localhost:8080/charts/pieChart?month=${month}`),
      axios.get(`http://localhost:8080/data/statistics?month=${month}`),
    ]);

    const combinedData = {
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
      statisticsData: statisticsData.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
