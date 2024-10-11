import Transaction from "../models/Transaction.js";

export const transactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    const regex = new RegExp(search, "i");

    const query = {
      $or: [
        { title: regex },
        { description: regex },
      ],
    };

    const searchPrice = parseFloat(search);
    if (!isNaN(searchPrice)) {
      query.$or.push({ price: searchPrice });
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
