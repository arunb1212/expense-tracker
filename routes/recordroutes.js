import express from "express"
import {createRecord,updateRecord,deleteRecord} from "../controllers/adminControllers.js"
import {getRecords} from "../controllers/userController.js"
import {getSummary} from "../controllers/dashboardController.js"
import {verifytoken} from "../middleware/authmiddleware.js"
import {access} from "../middleware/access.js"
const recordrouter=express.Router()
recordrouter.post("/records/create",verifytoken,access("admin",),createRecord)
recordrouter.post("/records/update/:id",verifytoken,access("admin",),updateRecord)
recordrouter.post("/records/delete/:id",verifytoken,access("admin",),deleteRecord)
recordrouter.get("/records",verifytoken,access("analyst","admin"),getRecords)
recordrouter.get("/dashboard/summary",verifytoken,access("analyst","admin","user"),getSummary)



export default recordrouter