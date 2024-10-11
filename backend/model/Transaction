import mongoose from 'mongoose';

// Define the schema directly
const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true },
});

// Create the model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
