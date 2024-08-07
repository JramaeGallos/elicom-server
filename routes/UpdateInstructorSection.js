const express = require('express');
const router = express.Router();
const {InstructorAccount, InstructorSection, StudentSection, StudentAccount, SectionList, InstructorRemark} = require("../models");

router.post("/add", async (req, res)=> {
    const {SectionListId, InstructorAccountId} = req.body
  
    InstructorSection.create({
        SectionListId: SectionListId, 
        InstructorAccountId: InstructorAccountId
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


router.post("/remove", async (req, res)=>{
    const {SectionListId, InstructorAccountId} = req.body;

    const removefromSection = await InstructorSection.findOne({where: 
        {SectionListId: SectionListId, InstructorAccountId:InstructorAccountId}
        })
        .catch(e => {
            console.log(e.message)
    })
    if (removefromSection){
        removefromSection.destroy();
        res.json("SUCCESS");
    }else{
        res.json("ERROR")
    }
})


router.post("/list", async (req, res)=>{
    const {SectionListId} = req.body
    const instructorSect = await InstructorSection.findAll({where: {SectionListId:SectionListId}})

    const instructorList=[]
    for (const element of instructorSect){
        const instructor = await InstructorAccount.findOne({where: {id: element.InstructorAccountId}})
        instructorList.push(instructor)
    }
    res.json(instructorList)
})

router.post("/section-list", async (req, res)=>{
    const {InstructorAccountId} = req.body
    const instructorSect = await InstructorSection.findAll({where: {InstructorAccountId:InstructorAccountId}})

    const sectionRec=[]
    for (const element of instructorSect){
        let section = await SectionList.findOne({where: {id:element.SectionListId}})
        sectionRec.push(section)
    }
    res.json(sectionRec)
})


//get class list with remark
router.post("/class-list", async (req, res)=>{
    const {SectionListId, InstructorAccountId} = req.body
    const instructorClass = await StudentSection.findAll({where: {SectionListId: SectionListId}})

    const classList=[]
    for (const element of instructorClass){
        const student = await StudentAccount.findOne({where: {id: element.StudentAccountId}})

        const existingRemark = await InstructorRemark.findOne({where: 
            {StudentAccountId: element.StudentAccountId, InstructorAccountId: InstructorAccountId}
        })

        let updatedStudent = {}

        if(existingRemark){
            updatedStudent = {
                ...student, 
                ["isClearedMT"]: existingRemark.isClearedMT,
                ["isClearedFinal"]: existingRemark.isClearedFinal,
                ["remark"]: existingRemark.remark 
            };
        }else{
            updatedStudent = {
                ...student, 
                ["isClearedMT"]: false,
                ["isClearedFinal"]: false,
                ["remark"]: ""
            };
        }

        classList.push(updatedStudent)
    }
    res.json(classList)
})


module.exports = router;