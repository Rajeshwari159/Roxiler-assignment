import Transaction from "../models/Transaction.js";

export const pieChart = async (req, res) => {
  const { month } = req.query;
  console.log("This is the month:", month);

  // Parse the month and validate it
  const parsedMonth = parseInt(month);
  if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).json({ error: "Invalid month value. Please provide a value between 1 and 12." });
  }

  try {
    // Fetch transactions where the month matches, handling both Date and String formats for `dateOfSale`
    const selectedMonthTransactions = await Transaction.find({
      $expr: {
        $eq: [
          {
            // Check if `dateOfSale` is a Date, if not convert it from string to date
            $month: {
              $cond: {
                if: { $eq: [{ $type: "$dateOfSale" }, "date"] }, // If it's already a date
                then: "$dateOfSale",
                else: { $dateFromString: { dateString: "$dateOfSale" } } // Convert string to date
              }
            }
          },
          parsedMonth
        ]
      }
    });

    console.log("Selected Month Transactions:", selectedMonthTransactions);

    if (selectedMonthTransactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for the specified month." });
    }

    const categoryCounts = {};

    // Count the number of transactions for each category
    selectedMonthTransactions.forEach((transaction) => {
      const category = transaction.category;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    // Format the result as pie chart data
    const pieChartData = Object.keys(categoryCounts).map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
