const express = require('express');
const router = express.Router();
const {ClearanceSignRemark, InstructorRemark, InstructorAccount, ClearanceSignAccount, RegistrarRemark, RegistrarAccount} = require("../models");

router.post("/list", async (req, res)=>{
    const {StudentAccountId} = req.body
    const instRemarkList = await InstructorRemark.findAll({where: {StudentAccountId:StudentAccountId}})
    const clearanceRemarkList = await ClearanceSignRemark.findAll({where: {StudentAccountId:StudentAccountId}})
    const registrarRemarkList = await RegistrarRemark.findAll({where: {StudentAccountId:StudentAccountId}})

    let studentRemarks = {}
    let instructorData = []
    let ClearanceData= []
    let registrarData=[]

    for(const element of instRemarkList){
        let  instructor= await InstructorAccount.findOne({where: {id:element.InstructorAccountId}})
        let data = {
            ...element, 
            ["firstName"]: instructor.firstName,
            ["lastName"]: instructor.lastName,
            ["position"]: "instructor"
        }
        instructorData.push(data)
    }

    for(const element of clearanceRemarkList){
        let  clearanceSign= await ClearanceSignAccount.findOne({where: {id:element.ClearanceSignAccountId}})
        
        data = {
            ...element, 
            ["firstName"]: clearanceSign.firstName,
            ["lastName"]: clearanceSign.lastName,
            ["position"]: clearanceSign.position
        }
        ClearanceData.push(data)
    }

    for(const element of registrarRemarkList){
        let  registrar= await RegistrarAccount.findOne({where: {id:element.RegistrarAccountId}})
        
        data = {
            ...element, 
            ["firstName"]: registrar.firstName,
            ["lastName"]: registrar.lastName,
            ["position"]: "registrar"
        }
        registrarData.push(data)
    }
    
    studentRemarks = {instructorData, ClearanceData, registrarData}
    res.json(studentRemarks)
})


module.exports = router;