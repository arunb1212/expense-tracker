import { Expense } from "../models/expenseModel.js"
import { User } from "../models/userModel.js";

// create record controller
export const createRecord = async (req, res) => {
  try {
    const { date, amount, type, note, category } = req.body;

    if (!date || !amount || !type || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    const record = await Expense.create({
      date,
      amount,
      type,
      note,
      category,
      createdBy: req.user.id
    });

    res.status(201).json({ message: "Record created", record });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update record controller
export const updateRecord = async (req, res) => {
  try {
    const record = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
);

if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(record);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete record controller
export const deleteRecord=async(req,res)=>{
    try {
        const record=await Expense.findByIdAndDelete(req.params.id)
        if(!record){
            return res.status(404).json({message:"Record not found"})
        }
        res.status(200).json({message:"Record deleted successfully"})
    } catch (error) {
        console.log(error.message)
    }
}




