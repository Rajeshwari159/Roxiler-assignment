import Transaction from "../models/Transaction.js";

export const statistics = async (req, res) => {
  const { month } = req.query;
  const parsedMonth = parseInt(month);

  // Validate the month
  if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).json({ error: "Invalid month value. Please provide a value between 1 and 12." });
  }

  console.log("This API has been called, filtering by month:", parsedMonth);

  try {
    // Fetch transactions where the month matches, ignoring the year and date
    const selectedMonthTransactions = await Transaction.find({
      $expr: {
        $eq: [
          {
            // Extract the month from dateOfSale field
            $month: {
              $cond: {
                if: { $eq: [{ $type: "$dateOfSale" }, "date"] }, // If it's already a date
                then: "$dateOfSale",
                else: { $dateFromString: { dateString: "$dateOfSale" } } // Convert string to date if needed
              }
            }
          },
          parsedMonth
        ]
      }
    });

    console.log("Selected Month Transactions:", selectedMonthTransactions);

    // Calculate total sale amount
    const totalSaleAmount = selectedMonthTransactions.reduce((total, transaction) => {
      return total + transaction.price;
    }, 0);

    // Calculate total sold and not sold items
    const totalSoldItems = selectedMonthTransactions.filter(
      (transaction) => transaction.sold
    ).length;

    const totalNotSoldItems = selectedMonthTransactions.filter(
      (transaction) => !transaction.sold
    ).length;

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
