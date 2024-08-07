const express = require("express");
const router = express.Router();
const {
    SystemManagement, 
    StudentAccount, 
    InstructorRemark, 
    ClearanceSignRemark, 
    RegistrarRemark, 
    StudentSection, 
    InstructorSection,
    SectionList,
    ClearanceSignAccount} 
    = require("../models");


router.post("/set-enrollment", async (req, res)=>{
    const {isOpenEnrollment} = req.body
    
    if(isOpenEnrollment){ // if open enrollment, reset all enrollment to false
        SystemManagement.update(
            {isOpenEnrollment: isOpenEnrollment,
            },
            {where: { id: 1} }
            ).then(()=>{
                res.json("SUCCESS")
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
            
        StudentAccount.update(
            { isEnrolled: false},
            { where: {} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
    }else{ // if close enrollment - close transaction - reset sectioning, reset remarks
        SystemManagement.update(
            {isOpenEnrollment: isOpenEnrollment,
                isOpenTransaction: false
            },
            {where: { id: 1} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })

        StudentSection.destroy({
            where: {},
            truncate: true
            })

        InstructorSection.destroy({
            where: {},
            truncate: true
            })

        StudentAccount.update(
            { hasSection: false},
            { where: {} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        
        StudentAccount.update( // unenrolled student
            {   isRegular: false,
                isPreregistered: false,
                isClearRecordClear: false,
                isClearRecordInst: false,
            },
            { where: { isEnrolled: false} }
            )
            .then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        
            
        InstructorRemark.destroy({
            where: {},
            truncate: true
            })
        
        ClearanceSignRemark.destroy({
            where: {},
            truncate: true
            })

        RegistrarRemark.destroy({
            where: {},
            truncate: true
            })
            
        res.json("SUCCESS")
    }
})

router.post("/set-transaction", async (req, res)=>{
    const {isOpenTransaction} = req.body

    // if close transaction- close enrollment - student sectioning will be reset, remarks will be reset
    if (!isOpenTransaction){
        SystemManagement.update(
            { isOpenTransaction: isOpenTransaction,
                isOpenEnrollment: false
            },
            { where: { id: 1} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        
        StudentSection.destroy({
            where: {},
            truncate: true
            })

        InstructorSection.destroy({
            where: {},
            truncate: true
            })

        StudentAccount.update(
            { hasSection: false},
            { where: {} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        
        StudentAccount.update( // unenrolled student
            {   isRegular: false,
                isPreregistered: false,
                isClearRecordClear: false,
                isClearRecordInst: false,
            },
            { where: { isEnrolled: false} }
            )
            .then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
                    
        InstructorRemark.destroy({
            where: {},
            truncate: true
            })
        
        ClearanceSignRemark.destroy({
            where: {},
            truncate: true
            })

        RegistrarRemark.destroy({
            where: {},
            truncate: true
            })
            
        res.json("SUCCESS")

    }else{ //if open transaction - create instructor remarks by section and clearance signatories remark
        SystemManagement.update(
            { isOpenTransaction: isOpenTransaction},
            { where: { id: 1} }
            ).then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        
        // create remarks for instructor by section
        const sectionList = await SectionList.findAll({where: {}})

        for (const section of sectionList){

            let instructorList = await InstructorSection.findAll({where: {SectionListId: section.id}})
            let studentList = await StudentSection.findAll({where: {SectionListId: section.id}})

            for(const instructor of instructorList){
                for (const student of studentList){
                    InstructorRemark.create({
                        StudentAccountId: student.StudentAccountId, 
                        InstructorAccountId: instructor.InstructorAccountId,
                    })
                    .then(()=>{
                    })
                    .catch((err)=>{
                        if (err) {
                            res.status(400).json({error:err});
                        }
                    })
                }
            }
        }

        // create remarks for clearance signatory for every student
        const clearanceAcctList = await ClearanceSignAccount.findAll({where: {}})
        const studentAcctList = await StudentAccount.findAll({where: {isEnrolled: true}})

        for (const clearance of clearanceAcctList){
            for (const student of studentAcctList){
                ClearanceSignRemark.create({
                    StudentAccountId: student.id, 
                    ClearanceSignAccountId: clearance.id,
                })
                .then(()=>{
                })
                .catch((err)=>{
                    if (err) {
                        res.status(400).json({error:err});
                    }
                })
            }
        }

        //create remarks for registrar
        for (const student of studentAcctList){
            RegistrarRemark.create({
                StudentAccountId: student.id, 
                RegistrarAccountId: 1,
            })
            .then(()=>{
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
        }

   
        res.json("SUCCESS")
    }
})

router.get("/get-status", async (req, res)=>{
    const status = await SystemManagement.findOne({where: {id: 1}})
    res.json(status)
})

router.post("/create", async(req, res)=>{
    const {isOpenEnrollment, isOpenTransaction} = req.body

    SystemManagement.create({
        isOpenEnrollment: isOpenEnrollment,
        isOpenTransaction: isOpenTransaction
    })
    .then(()=>{
        res.json("SUCCESS")
    })
    .catch((err)=>{
        if (err) {
            res.status(400).json({error:err});
        }
    })
})


module.exports = router