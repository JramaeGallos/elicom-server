const express = require('express');
const router = express.Router();
const {StudentAccount, StudentSection} = require("../models");

router.post("/add", async (req, res)=> {
    const {SectionListId, StudentAccountId} = req.body

    StudentAccount.update(
        { hasSection: true },
        { where: { id: StudentAccountId} }
    )
  
    StudentSection.create({
        SectionListId: SectionListId, 
        StudentAccountId: StudentAccountId
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
    const {SectionListId, StudentAccountId} = req.body;

    StudentAccount.update(
        { hasSection: false },
        { where: { id: StudentAccountId} }
    )

    const removefromSection = await StudentSection.findOne({where: 
        {SectionListId: SectionListId, StudentAccountId:StudentAccountId}
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
    const enrolled = await StudentSection.findAll({where: {SectionListId:SectionListId}})

    const studentList=[]
    for (const element of enrolled){
        const enrolledStudent = await StudentAccount.findOne({where: {id: element.StudentAccountId}})
        studentList.push(enrolledStudent)
    }
    res.json(studentList)
})

module.exports = router;