const express = require('express');
const router = express.Router();
const { RegistrarRemark} = require("../models");

router.post("/update-remark", async (req, res)=> {
    const {StudentAccountId, RegistrarAccountId, remark} = req.body

    const existingRemark = await RegistrarRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, RegistrarAccountId: RegistrarAccountId}
    })
    
    // if the remark is existing- update
    if (existingRemark){
        RegistrarRemark.update(
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
    }else{
        RegistrarRemark.create({
            StudentAccountId: StudentAccountId, 
            RegistrarAccountId: RegistrarAccountId,
            remark: remark
        })
        .then(()=>{
        })
        .catch((err)=>{
            if (err) {
                res.status(400).json({error:err});
            }
        })
    }
})

router.post("/get-remark", async (req, res)=> {
    const {StudentAccountId, RegistrarAccountId} = req.body

    const existingRemark = await RegistrarRemark.findOne({where: 
        {StudentAccountId: StudentAccountId, RegistrarAccountId: RegistrarAccountId}
    })

    if(existingRemark){
        res.json(existingRemark.remark)
    }else{
        res.json(null)
    }
})


module.exports = router;