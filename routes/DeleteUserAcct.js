const express = require("express");
const router = express.Router();
const {StudentAccount, RegistrarAccount, ClearanceSignAccount, InstructorAccount} = require("../models");

router.post("/instructor", async (req, res)=>{
    const {id} = req.body;
    const instructorUser = await InstructorAccount.findOne({where: {id: id}})
        .catch(e => {
            console.log(e.message)
    })

    if (instructorUser){
        instructorUser.destroy();
        res.json("SUCCESS");
    }else{
        res.json("ERROR")
    }
})

router.post("/clearanceSign", async (req, res)=>{
    const {id} = req.body;
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {id: id}})
        .catch(e => {
            console.log(e.message)
    })

    if (clearanceSignUser){
        clearanceSignUser.destroy();
        res.json("SUCCESS");
    }else{
        res.json("ERROR")
    }
})

router.post("/student", async (req, res)=>{
    const {id} = req.body;
    const studentUser = await StudentAccount.findOne({where: {id: id}})
        .catch(e => {
            console.log(e.message)
    })

    if (studentUser){
        studentUser.destroy();
        res.json("SUCCESS");
    }else{
        res.json("ERROR")
    }
})


module.exports = router