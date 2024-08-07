const express = require("express");
const router = express.Router();
const {StudentAccount} = require("../models");

router.post("/data", async (req, res)=>{
    const {id} = req.body;
    
    const studentData = await StudentAccount.findOne({where: {id: id}})

    if(studentData){
        res.json(studentData)
    }else(
        res.json(null)
    )
})

router.post("/clear-record-clearance", async (req, res)=>{
    const {id, isClearRecordClear} = req.body;
    
    StudentAccount.update(
        { isClearRecordClear: isClearRecordClear },
        { where: { id: id} }
        )
        .then(()=>{
            res.json("SUCCESS")
        })
        .catch((err)=>{
            if (err) {
                res.status(400).json({error:err});
            }
        })
})

router.post("/clear-record-instructor", async (req, res)=>{
    const {id, isClearRecordInst} = req.body;
    
    StudentAccount.update(
        { isClearRecordInst: isClearRecordInst },
        { where: { id: id} }
        )
        .then(()=>{
            res.json("SUCCESS")
        })
        .catch((err)=>{
            if (err) {
                res.status(400).json({error:err});
            }
        })
})

router.post("/change-type", async (req, res)=>{
    const {id, isRegular} = req.body;
    
    StudentAccount.update(
        { isRegular: isRegular },
        { where: { id: id} }
        )
        .then(()=>{
            res.json("SUCCESS")
        })
        .catch((err)=>{
            if (err) {
                res.status(400).json({error:err});
            }
        })
})

router.post("/preregister", async (req, res)=>{
    const {
        id,
        middleName, 
        age,
        sex,
        birthDate,
        birthPlace,
        civilStatus,
        contactNumber,
        temporaryAddress,
        permanentAddress,
        lrn,
        yearLevel,
        course,
        specialization,
        subjects,
        motherName,
        motherOccupation, 
        fatherName,
        fatherOccupation,
        guardianName,
        guardianRelationship,
        guardianAddress,
        guardianContact,
        annualIncome
    } = req.body;
    
    StudentAccount.update(
        {   isPreregistered: true,
            middleName: middleName,
            age: age,
            sex: sex,
            birthDate: birthDate,
            birthPlace: birthPlace,
            civilStatus: civilStatus,
            contactNumber: contactNumber,
            temporaryAddress: temporaryAddress,
            permanentAddress: permanentAddress,
            lrn: lrn, 
            yearLevel: yearLevel,
            course: course,
            specialization: specialization,
            subjects: subjects,
            motherName: motherName,
            motherOccupation: motherOccupation,
            fatherName: fatherName,
            fatherOccupation: fatherOccupation,
            guardianName: guardianName,
            guardianRelationship: guardianRelationship,
            guardianAddress: guardianAddress,
            guardianContact: guardianContact,
            annualIncome: annualIncome
        },
        { where: 
            {   id: id} 
        }
        )
        .then(()=>{
            res.json("SUCCESS")
        })
        .catch((err)=>{
            if (err) {
                res.status(400).json({error:err});
            }
        })
})

router.post("/enroll", async (req, res)=>{
    const {id, isEnrolled} = req.body;
    
    StudentAccount.update(
        {   isEnrolled: isEnrolled,
            isPreregistered: false,
            isClearRecordClear: false,
            isClearRecordInst: false,
            isNewStudent: false
        },
        { where: { id: id} }
        )
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
