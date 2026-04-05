
import { Expense } from "../models/expenseModel.js"

export const getSummary=async(req,res)=>{
  try {
   const income=await Expense.aggregate([
    { $match:{type:"income"} },
    { $group:{
      _id:"$type",
      total:{$sum:"$amount"}
    } }
   ])
   const expense=await Expense.aggregate([
    { $match:{type:"expense"} },
    { $group:{
      _id:"$type",
      total:{$sum:"$amount"}
    } }
   ])
   const totalIncome=income[0]?.total || 0
   const totalExpense=expense[0]?.total || 0
   const balance=totalIncome-totalExpense
   const summary={
    totalIncome,
    totalExpense,
    balance
   }
    return res.status(200).json({message:"Summary fetched successfully",summary})
  } catch (error) {
    console.log(error.message)
  }
}