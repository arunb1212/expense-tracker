// for admin
import { Expense } from "../models/expenseSchema.js"
import { User } from "../models/userSchema.js";
// export const admin=async(req,res)=>{
//     // return res.status(200).json({message:"welcome back admin"})
//     const {date,amount,type,note,category}=req.body
//     if(!date || !amount || !type || !category){
//         return res.status(400).json({message:"all fields are required"})
//     }
//     const newexpense=await Expense.create({date,amount,type,note,category})
//     return res.status(201).json({message:"expense created successfully",newexpense})

// }


// // for dashboard

// export const dashboard=async(req,res)=>{
//     return res.status(200).json({message:"welcome back dashboard"})
// }


// // user

// export const user=async(req,res)=>{
//     return res.status(200).json({message:"welcome back user"})
// }


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
        return res.status(200).json({message:"Records fetched successfully",records})
    } catch (error) {
        console.log(error.message)
    }
}