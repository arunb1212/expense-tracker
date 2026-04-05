import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema({
    amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },

  category: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  note: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export const Expense=mongoose.model("Expense",expenseSchema)