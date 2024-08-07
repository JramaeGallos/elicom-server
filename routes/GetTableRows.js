const express = require("express");
const router = express.Router();
const {StudentAccount, RegistrarAccount, ClearanceSignAccount, InstructorAccount} = require("../models");


router.get("/enrolled", async (req, res)=>{
    const studentUser = await StudentAccount.findAll({where: {isEnrolled: true}})
    res.json(studentUser)
})

router.get("/not-enrolled", async (req, res)=>{
    const studentUser = await StudentAccount.findAll({where: {isEnrolled: false}})
    res.json(studentUser)
})

router.get("/enrolled-no-section-regular", async (req, res)=>{
    const studentUser = await StudentAccount.findAll({where: {isEnrolled: true, hasSection: false, isRegular:true}}) //regular student with no section
    const studentUserIrreg = await StudentAccount.findAll({where: {isEnrolled: true, isRegular:false}}) // irregular students excemption for sectioning

    const merge = studentUser.concat(studentUserIrreg)
    res.json(merge)
})

module.exports = router