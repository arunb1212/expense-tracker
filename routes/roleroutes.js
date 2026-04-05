import express from "express"
import {createRecord,updateRecord,deleteRecord,getRecords,getSummary} from "../controllers/roleComtrollers.js"
import {verifytoken} from "../middleware/authmiddleware.js"
import {access} from "../middleware/access.js"
const accerouter=express.Router()
accerouter.post("/records/create",verifytoken,access("admin",),createRecord)
// accerouter.get("/records/view",verifytoken,access("analyst","admin"),dashboard)
accerouter.post("/records/update/:id",verifytoken,access("admin",),updateRecord)
accerouter.post("/records/delete/:id",verifytoken,access("admin",),deleteRecord)
accerouter.get("/records",verifytoken,access("analyst","admin"),getRecords)
accerouter.get("/dashboard/summary",verifytoken,access("analyst","admin","user"),getSummary)



export default accerouter