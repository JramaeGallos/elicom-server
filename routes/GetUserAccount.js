const express = require("express");
const router = express.Router();
const {StudentAccount, RegistrarAccount, ClearanceSignAccount, InstructorAccount} = require("../models");


router.get("/instructor", async (req, res)=>{
    const listOfIinstructor = await InstructorAccount.findAll();
    res.json(listOfIinstructor)
})

router.get("/clearanceSign", async (req, res)=>{
    const listOfClearanceSign = await ClearanceSignAccount.findAll();
    res.json(listOfClearanceSign)
})

router.get("/student", async (req, res)=>{
    const listOfStudent = await StudentAccount.findAll();
    res.json(listOfStudent)
})

router.post("/clearanceSign-dataById", async (req, res)=>{
    const {id} = req.body;
    
    const clearanceData = await ClearanceSignAccount.findOne({where: {id: id}})

    if(clearanceData){
        res.json(clearanceData)
    }else(
        res.json(null)
    )
})

router.post("/instructor-dataById", async (req, res)=>{
    const {id} = req.body;
    
    const instructorData = await InstructorAccount.findOne({where: {id: id}})

    if(instructorData){
        res.json(instructorData)
    }else(
        res.json(null)
    )
})

router.post("/registrar-dataById", async (req, res)=>{
    const {id} = req.body;
    
    const registrarData = await RegistrarAccount.findOne({where: {id: id}})

    if(registrarData){
        res.json(registrarData)
    }else(
        res.json(null)
    )
})



module.exports = router