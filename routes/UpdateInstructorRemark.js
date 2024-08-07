const express = require('express');
const router = express.Router();
const { InstructorRemark, StudentAccount} = require("../models");

// set all midterm status
router.post("/update-all-mt", async (req, res)=> {
    const {studentIdList, InstructorAccountId} = req.body

    for (const id of studentIdList) {
        let existingRemark = await InstructorRemark.findOne({where: 
            {StudentAccountId: id, InstructorAccountId: InstructorAccountId}
        })
        
        // if the remark is existing- update
        if (existingRemark){
            // if both midterm and final are cleared - set the remark to empty space
            if(existingRemark.isClearedFinal){
                InstructorRemark.update(
                    { remark: "", isClearedMT: true},
                    { where: { id: existingRemark.id} }
                    )
                    .then(async()=>{
                        //check if student is cleared for all instructor remarks - set the record cleared for student account
                        const allRemarks = await InstructorRemark.findAll({where: {StudentAccountId: id}})
                                
                        let checkStatus=true
                        for(const studentStatus of allRemarks){
                            if(studentStatus.isClearedFinal===false || studentStatus.isClearedMT===false){
                                checkStatus=false
                                break
                            }
                        } 

                        if (checkStatus){
                            StudentAccount.update(
                                { isClearRecordInst: true },
                                { where: { id: id} }
                                )
                                .then(()=>{
                                })
                                .catch((err)=>{
                                    if (err) {
                                        res.status(400).json({error:err});
                                    }
                            })
                        }
                        res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            res.status(400).json({error:err});
                        }
                    })
                
            }else{
                InstructorRemark.update(
                    { isClearedMT: true },
                    { where: { id: existingRemark.id} }
                    )
                    .then(()=>{
                        res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            res.status(400).json({error:err});
                        }
                })
            }

        }
    }
})

// set all final status
router.post("/update-all-final", async (req, res)=> {
    const {studentIdList, InstructorAccountId} = req.body

    for (const id of studentIdList) {
        let existingRemark = await InstructorRemark.findOne({where: 
            {StudentAccountId: id, InstructorAccountId: InstructorAccountId}
        })
        
        // if the remark is existing- update
        if (existingRemark){
            // if both midterm and final are cleared - set the remark to empty space
            if(existingRemark.isClearedMT){
                InstructorRemark.update(
                    { remark: "", isClearedFinal: true},
                    { where: { id: existingRemark.id} }
                    )
                    .then(async()=>{
                        //check if student is cleared for all instructor remarks - set the record cleared for student account
                        const allRemarks = await InstructorRemark.findAll({where: {StudentAccountId: id}})
                                
                        let checkStatus=true
                        for(const studentStatus of allRemarks){
                            if(studentStatus.isClearedFinal===false || studentStatus.isClearedMT===false){
                                checkStatus=false
                                break
                            }
                        } 

                        if (checkStatus){
                            StudentAccount.update(
                                { isClearRecordInst: true },
                                { where: { id: id} }
                                )
                                .then(()=>{
                                })
                                .catch((err)=>{
                                    if (err) {
                                        res.status(400).json({error:err});
                                    }
                            })
                        }
                        res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            res.status(400).json({error:err});
                        }
                    })
                
               
            }else{
                InstructorRemark.update(
                    { isClearedFinal: true },
                    { where: { id: existingRemark.id} }
                    )
                    .then(()=>{
                        res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            res.status(400).json({error:err});
                        }
                })

            }
        }
    }
})


// update midterm status
router.post("/update-mt", async (req, res)=> {
    const {StudentAccountId, InstructorAccountId} = req.body

    const existingRemark = await InstructorRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, InstructorAccountId: InstructorAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        // if both midterm and final are cleared - set the remark to empty space 
        if(existingRemark.isClearedFinal){
            InstructorRemark.update(
                { remark: "", isClearedMT: true},
                { where: { id: existingRemark.id} }
                )
                .then(async()=>{

                    //check if student is cleared for all instructor remarks - set the record cleared for student account
                    const allRemarks = await InstructorRemark.findAll({where: {StudentAccountId: StudentAccountId}})
                            
                    let checkStatus=true
                    for(const studentStatus of allRemarks){
                        if(studentStatus.isClearedFinal===false || studentStatus.isClearedMT===false){
                            checkStatus=false
                            break
                        }
                    } 

                    if (checkStatus){
                        StudentAccount.update(
                            { isClearRecordInst: true },
                            { where: { id: StudentAccountId} }
                            )
                            .then(()=>{
                            })
                            .catch((err)=>{
                                if (err) {
                                    res.status(400).json({error:err});
                                }
                        })
                    }
                    res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        res.status(400).json({error:err});
                    }
                })
        }else{
            InstructorRemark.update(
                { isClearedMT: true },
                { where: { id: existingRemark.id} }
                )
                .then(()=>{
                    res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        res.status(400).json({error:err});
                    }
            })
        }
    }
})

// update final status
router.post("/update-final", async (req, res)=> {
    const {StudentAccountId, InstructorAccountId} = req.body

    const existingRemark = await InstructorRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, InstructorAccountId: InstructorAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        // if both midterm and final are cleared - set the remark to empty space
        if(existingRemark.isClearedMT){
            InstructorRemark.update(
                { remark: "", isClearedFinal: true },
                { where: { id: existingRemark.id} }
                )
                .then(async()=>{

                    //check if student is cleared for all instructor remarks - set the record cleared for student account
                    const allRemarks = await InstructorRemark.findAll({where: {StudentAccountId: StudentAccountId}})
                            
                    let checkStatus=true
                    for(const studentStatus of allRemarks){
                        if(studentStatus.isClearedFinal===false || studentStatus.isClearedMT===false){
                            checkStatus=false
                            break
                        }
                    } 

                    if (checkStatus){
                        StudentAccount.update(
                            { isClearRecordInst: true },
                            { where: { id: StudentAccountId} }
                            )
                            .then(()=>{
                            })
                            .catch((err)=>{
                                if (err) {
                                    res.status(400).json({error:err});
                                }
                        })
                    }
                })
                .catch((err)=>{
                    if (err) {
                        res.status(400).json({error:err});
                    }
                })
        }else{
            InstructorRemark.update(
                { isClearedFinal: true },
                { where: { id: existingRemark.id} }
                )
                .then(()=>{
                    res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        res.status(400).json({error:err});
                    }
                })
        }
    }

})

router.post("/update-remark", async (req, res)=> {
    const {StudentAccountId, InstructorAccountId, remark} = req.body

    const existingRemark = await InstructorRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, InstructorAccountId: InstructorAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        InstructorRemark.update(
            { remark: remark },
            { where: { id: existingRemark.id} }
            )
            .then(()=>{
                res.json("SUCCESS")
            })
            .catch((err)=>{
                if (err) {
                    res.status(400).json({error:err});
                }
            })
    }
})


module.exports = router;
