const express = require('express');
const router = express.Router();
const {SectionList, StudentSection, StudentAccount, ClearanceSignRemark} = require("../models");


router.post("/section-list", async (req, res)=>{
    const {yearLevel, degreeCode} = req.body
    const sections = await SectionList.findAll({where: {yearLevel: yearLevel, degreeCode: degreeCode}})

    res.json(sections)
})

router.post("/class-list", async (req, res)=>{
    const {SectionListId, ClearanceSignAccountId} = req.body
    const sectionClass = await StudentSection.findAll({where: {SectionListId: SectionListId}})

    const classList=[]
    for (const element of sectionClass){
        const student = await StudentAccount.findOne({where: {id: element.StudentAccountId}})

        const existingRemark = await ClearanceSignRemark.findOne({where: 
            {StudentAccountId: element.StudentAccountId, ClearanceSignAccountId: ClearanceSignAccountId}
        })

        let updatedStudent = {}

        if(existingRemark){
            updatedStudent = {
                ...student, 
                ["isClearedRecord"]: existingRemark.isClearedRecord,
                ["remark"]: existingRemark.remark 
            };
        }else{
            updatedStudent = {
                ...student, 
                ["isClearedRecord"]: false,
                ["remark"]: ""
            };
        }

        classList.push(updatedStudent)
    }
    res.json(classList)

})



module.exports = router;