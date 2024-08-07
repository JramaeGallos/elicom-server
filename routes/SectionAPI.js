const express = require('express');
const router = express.Router();
const { SectionList} = require("../models");
const { AsyncQueueError } = require('sequelize');

router.post("/create", async (req, res)=> {
    const {degreeCode, degreeDesc, specializationCode, specializationDesc, sectionCode, yearLevel} = req.body

    SectionList.create({
        degreeCode: degreeCode,
        degreeDesc: degreeDesc,
        specializationCode: specializationCode,
        specializationDesc: specializationDesc, 
        sectionCode: sectionCode,
        yearLevel: yearLevel
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


router.post("/list", async (req, res)=>{
    const {degreeCode, specializationCode, yearLevel} = req.body
    const sectionList = await SectionList.findAll({where: {degreeCode: degreeCode, specializationCode:specializationCode, yearLevel: yearLevel}})
    res.json(sectionList)
})


router.post("/delete", async (req, res)=>{
    const {id} = req.body;
    const sectionDel = await SectionList.findOne({where: {id: id}})
        .catch(e => {
            console.log(e.message)
    })
    if (sectionDel){
        sectionDel.destroy();
        res.json("SUCCESS");
    }else{
        res.json("ERROR")
    }
})



module.exports = router;