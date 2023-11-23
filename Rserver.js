const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/money_tracker", { useNewUrlParser: true, useUnifiedTopology: true });

// Define transaction schema
const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.use(bodyParser.json());

// API endpoint to get transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API endpoint to add a new transaction
app.post("/api/transactions", async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const newTransaction = new Transaction({ description, amount, type });
        await newTransaction.save();

        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});