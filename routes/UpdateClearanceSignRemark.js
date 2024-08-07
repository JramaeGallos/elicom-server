const express = require('express');
const router = express.Router();
const {ClearanceSignRemark, StudentAccount, ClearanceSignAccount} = require("../models");

router.post("/data", async (req, res)=>{
    const {id} = req.body;
    
    const clearanceData = await ClearanceSignAccount.findOne({where: {id: id}})

    if(clearanceData){
        res.json(clearanceData)
    }else(
        res.json(null)
    )
})

// update record for al
router.post("/update-all-record", async (req, res)=> {
    const {studentIdList, ClearanceSignAccountId} = req.body

    for(const id of studentIdList){
        const existingRemark = await ClearanceSignRemark.findOne({where: 
            {StudentAccountId: id, ClearanceSignAccountId: ClearanceSignAccountId}
        })
        
        // if the remark is existing- update
        if (existingRemark){
            ClearanceSignRemark.update(
                { remark: "", isClearedRecord: true },
                { where: { id: existingRemark.id} }
                )
                .then(async()=>{
                    //check if student is cleared for all instructor remarks - set the record cleared for student account
                    const allRemarks = await ClearanceSignRemark.findAll({where: {StudentAccountId: id}})

                    let checkStatus=true
                    for(const studentStatus of allRemarks){
                        if(studentStatus.isClearedRecord===false){
                            checkStatus=false
                            break
                        }
                    } 
                

                    if (checkStatus){
                        StudentAccount.update(
                            { isClearRecordClear: true },
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
        }
    }
})

// update record status
router.post("/update-record", async (req, res)=> {
    const {StudentAccountId, ClearanceSignAccountId} = req.body

    const existingRemark = await ClearanceSignRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, ClearanceSignAccountId: ClearanceSignAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        // if record is cleared - set the remark to empty space
        ClearanceSignRemark.update(
            { remark: "", isClearedRecord: true },
            { where: { id: existingRemark.id} }
            )
            .then(async()=>{
                //check if student is cleared for all instructor remarks - set the record cleared for student account
                const allRemarks = await ClearanceSignRemark.findAll({where: {StudentAccountId: StudentAccountId}})

                let checkStatus=true
                for(const studentStatus of allRemarks){
                    if(studentStatus.isClearedRecord===false){
                        checkStatus=false
                        break
                    }
                } 
            

                if (checkStatus){
                    StudentAccount.update(
                        { isClearRecordClear: true },
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
    }
})

router.post("/update-remark", async (req, res)=> {
    const {StudentAccountId, ClearanceSignAccountId, remark} = req.body

    const existingRemark = await ClearanceSignRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, ClearanceSignAccountId: ClearanceSignAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        ClearanceSignRemark.update(
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