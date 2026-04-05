
import { Expense } from "../models/expenseModel.js"

// all
export const getRecords=async(req,res)=>{
  const {type,category}=req.query
  const filter={}
  if(type){
    filter.type=type
  }
  if(category){
    filter.category=category
  }
    try {
        const records=await Expense.find(filter)
        if(records.length===0){
          return res.status(404).json({message:"No records found"})
        }
        return res.status(200).json({message:"Records fetched successfully",records})
    } catch (error) {
        console.log(error.message)
    }
}