const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const {StudentAccount, RegistrarAccount, ClearanceSignAccount, InstructorAccount} = require("../models");


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jagallos@up.edu.ph',
      pass: 'khka kzdq ezwa maea',
    },
  });


router.post("/verify", async (req, res)=>{
    const {email, verificationToken, userType} = req.body;
    
    
    if (userType==="student") {
        const studentUser = await StudentAccount.findOne({where: {email: email}})

        if(studentUser){
            if(studentUser.verificationToken === verificationToken){

                StudentAccount.update(
                { isVerified: true },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            }else{
                return res.json({error:"Wrong verification code."})
            }
        }else{
            return res.json({error: "Email Doesn't Exist"}); 
        }
        
    }else if(userType==="instructor"){
        const instructorUser = await InstructorAccount.findOne({where: {email: email}})

        if(instructorUser){
            if(instructorUser.verificationToken === verificationToken){

                InstructorAccount.update(
                { isVerified: true },
                { where: { email: email} }
                )
                .then(()=>{
                    res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            }else{
                return res.json({error:"Wrong verification code."})
            }
        }else{
            return res.json({error: "Email Doesn't Exist"}); 
        }
       
    }else if(userType==="clearanceSign"){
        const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})

        if(clearanceSignUser){
            if(clearanceSignUser.verificationToken === verificationToken){

                ClearanceSignAccount.update(
                { isVerified: true },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            }else{
                return res.json({error:"Wrong verification code."})
            }
        }else{
            return res.json({error: "Email Doesn't Exist"}); 
        }
      
    }else if(userType==="registrar"){ 
        const registrarUser = await RegistrarAccount.findOne({where: {email: email}})

        if(registrarUser){
            if(registrarUser.verificationToken === verificationToken){

                RegistrarAccount.update(
                { isVerified: true },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            }else{
                return res.json({error:"Wrong verification code."})
            }
        }else{
            return res.json({error: "Email Doesn't Exist"}); 
        }
      
    }else{
        return res.json({error: "Email Doesn't Exist"}); 
    }
})

router.post("/forgot-pass", async (req, res)=>{
    const {email} = req.body;
    
    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    //check if the email not registered in the application
    if(!studentUser && !registrarUser && !clearanceSignUser && !instructorUser){
        return res.json({error: "Email Doesn't Exist"}); 
    }

    const verificationToken = Math.random().toString(36).substring(7);
    
    const mailOptions = {
        from: 'jagallos@up.edu.ph',
        to: email,
        subject: 'Forgot Password - eLICOM',
        text: `To reset your password, enter the verification code below with your new password in the forgot password form.

        Verification Code : ${verificationToken}`,
      };
    
    transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ error: 'Internal server error. Try again later' });
    }  //successfully sent verification email
        
        if (studentUser) {
            StudentAccount.update(
                { verificationToken: verificationToken },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            
        }else if(registrarUser){
            RegistrarAccount.update(
                { verificationToken: verificationToken },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
           
        }else if(clearanceSignUser){
            ClearanceSignAccount.update(
                { verificationToken: verificationToken },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            
        }else if(instructorUser){
            InstructorAccount.update(
                { verificationToken: verificationToken },
                { where: { email: email} }
                )
                .then(()=>{
                    return res.json("SUCCESS")
                })
                .catch((err)=>{
                    if (err) {
                        return res.status(400).json({error:err});
                    }
                })
            
        }
    });
})

router.post("/reset-pass", async (req, res)=>{
    const {email, password, verificationToken} = req.body

    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})


    if (studentUser) { // student user

        if(studentUser.verificationToken === verificationToken){
            
            bcrypt.hash(password, 10).then((hash)=>{
                StudentAccount.update(
                    { password: hash },
                    { where: { email: email} }
                    )
                    .then(()=>{
                        return res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            return res.status(400).json({error:err});
                        }
                })
            })
        }else{
            return res.json({error:"Wrong verification code."})
        }
        
    }else if(instructorUser){ // instructor user

        if(instructorUser.verificationToken === verificationToken){

            bcrypt.hash(password, 10).then((hash)=>{
                InstructorAccount.update(
                    { password: hash },
                    { where: { email: email} }
                    )
                    .then(()=>{
                        return res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            return res.status(400).json({error:err});
                        }
                })
            })
        }else{
            return res.json({error:"Wrong verification code."})
        }
       
    }else if(clearanceSignUser){ // clearance signatory user

        if(clearanceSignUser.verificationToken === verificationToken){

            bcrypt.hash(password, 10).then((hash)=>{
                ClearanceSignAccount.update(
                    { password: hash },
                    { where: { email: email} }
                    )
                    .then(()=>{
                        return res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            return res.status(400).json({error:err});
                        }
                })
            })
        }else{
            return res.json({error:"Wrong verification code."})
        }
       
    }else if(registrarUser){ 
        if(registrarUser.verificationToken === verificationToken){

            bcrypt.hash(password, 10).then((hash)=>{
                RegistrarAccount.update(
                    { password: hash },
                    { where: { email: email} }
                    )
                    .then(()=>{
                        return res.json("SUCCESS")
                    })
                    .catch((err)=>{
                        if (err) {
                            return res.status(400).json({error:err});
                        }
                })
            })

        }else{
            return res.json({error:"Wrong verification code."})
        }

    }else{
        return res.json({error: "Email Doesn't Exist"}); 
    }

})


module.exports = router