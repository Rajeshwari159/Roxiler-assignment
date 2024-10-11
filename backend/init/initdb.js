import mongoose from "mongoose";
import { sampleData } from "./data.js";
import Transaction from "../models/Transaction.js";

main().then(res => console.log(res)).catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/piyush');
};

const initDB = async ()=>{
    await Transaction.deleteMany({});
    await Transaction.insertMany(sampleData);
    console.log("data was initalized ");
};

initDB();