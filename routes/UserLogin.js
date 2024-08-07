const express = require('express');
const router = express.Router();
const {StudentAccount, RegistrarAccount, ClearanceSignAccount, InstructorAccount} = require("../models");
const { AsyncQueueError } = require('sequelize');
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jagallos@up.edu.ph',
      pass: 'khka kzdq ezwa maea',
    },
  });

//register instructor account
router.post("/register-instructor", async (req, res)=> {
    const {firstName, lastName, password, employeeNumber, email} = req.body;

    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    if (studentUser || registrarUser || clearanceSignUser || instructorUser){
        return res.json({error:"Email already exists!"})
    }

    const empNumberRec = await InstructorAccount.findOne({where: {employeeNumber: employeeNumber}})
    if(empNumberRec){
        return res.json({error:"Employee number already exists"})
    }

    const verificationToken = Math.random().toString(36).substring(7);
    
    const mailOptions = {
        from: 'jagallos@up.edu.ph',
        to: email,
        subject: 'Email Verification - eLICOM',
        text: `
        Good day ${firstName.toUpperCase()}!

        Your email is now activated to use the eLICOM application. 
        
        Take note of your user credentials to log in your eLICOM account. 

        Email : ${email} 
        Verification Token : ${verificationToken} 
        Password:  ${password}`,
      };
    
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending verification email:', error);
          return res.status(500).json({ error: 'Internal server error. Try again later' });
        }  //successfully sent verification email

            bcrypt.hash(password, 10).then((hash)=>{
                InstructorAccount.create({
                    firstName: firstName,
                    lastName: lastName,
                    password: hash,
                    employeeNumber: employeeNumber, 
                    email: email,
                    verificationToken: verificationToken,
                    isVerified: false
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
      });
});

// register registrar account
router.post("/register-registrar", async (req, res)=> {
    const {firstName, lastName, password, employeeNumber, email} = req.body;

    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    if (studentUser || registrarUser || clearanceSignUser || instructorUser){
        return res.json({error:"Email already exists!"})
    }

    const empNumberRec = await RegistrarAccount.findOne({where: {employeeNumber: employeeNumber}})
    if(empNumberRec){
        return res.json({error:"Employee number already exists"})
    }

    const verificationToken = Math.random().toString(36).substring(7);
    
    const mailOptions = {
        from: 'jagallos@up.edu.ph',
        to: email,
        subject: 'Email Verification - eLICOM',
        text: `Good day ${firstName.toUpperCase()}!
        
        Your email is now activated to use the eLICOM application. 
        Take note of your user credentials to log in your eLICOM account. 

        Email : ${email} 
        Verification Token : ${verificationToken} 
        Password:  ${password}`,
      };
    
    transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ error: 'Internal server error. Try again later' });
    }  //successfully sent verification email

        bcrypt.hash(password, 10).then((hash)=>{
            RegistrarAccount.create({
                firstName: firstName,
                lastName: lastName,
                password: hash,
                employeeNumber: employeeNumber,
                email: email,
                verificationToken: verificationToken,
                isVerified: false
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
    });
});

// register clearane sign account
router.post("/register-clearanceSign", async (req, res)=> {
    const {firstName, lastName, password, employeeNumber, position, email} = req.body;

    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    if (studentUser || registrarUser || clearanceSignUser || instructorUser){
        return res.json({error:"Email already exists!"})
    }

    const empNumberRec = await ClearanceSignAccount.findOne({where: {employeeNumber: employeeNumber}})
    if(empNumberRec){
        return res.json({error:"Employee number already exists"})
    }

    const verificationToken = Math.random().toString(36).substring(7);
    
    const mailOptions = {
        from: 'jagallos@up.edu.ph',
        to: email,
        subject: 'Email Verification - eLICOM',
        text: `Good day ${firstName.toUpperCase()}!

        Your email is now activated to use the eLICOM application. 
        
        Take note of your user credentials to log in your eLICOM account. 

        Email : ${email} 
        Verification Token : ${verificationToken} 
        Password:  ${password}`,
      };
    
    transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ error: 'Internal server error. Try again later' });
    }  //successfully sent verification email

        bcrypt.hash(password, 10).then((hash)=>{
            ClearanceSignAccount.create({
                firstName: firstName,
                lastName: lastName,
                password: hash,
                employeeNumber: employeeNumber,
                position: position,
                email: email,
                verificationToken: verificationToken,
                isVerified: false
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
    });
});


// register student account
router.post("/register-student", async (req, res)=> {
    const {firstName, lastName, password, studentNumber, email} = req.body;

    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    if (studentUser || registrarUser || clearanceSignUser || instructorUser){
        return res.json({error:"Email already exists!"})
    }

    const studentNumberRec = await StudentAccount.findOne({where: {studentNumber: studentNumber}})
    if(studentNumberRec){
        return res.json({error:"Student number already exists"})
    }

    const verificationToken = Math.random().toString(36).substring(7);
    
    const mailOptions = {
        from: 'jagallos@up.edu.ph',
        to: email,
        subject: 'Email Verification -eLICOM',
        text: `Good day ${firstName.toUpperCase()}!

        Your email is now activated to use the eLICOM application. 
        
        Take note of your user credentials to log in your eLICOM account. 

        Email : ${email} 
        Verification Token : ${verificationToken} 
        Password:  ${password}`,
      };
    
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending verification email:', error);
          return res.status(500).json({ error: 'Internal server error. Try again later' });
        }  //successfully sent verification email

            bcrypt.hash(password, 10).then((hash)=>{
                StudentAccount.create({
                    firstName: firstName,
                    lastName: lastName,
                    password: hash,
                    studentNumber: studentNumber,
                    email: email,
                    verificationToken: verificationToken,
                    isVerified: false,
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
      });

});


//user login
router.post('/', async(req, res)=>{
    const {password, email} = req.body;
    var user = false;
    var userType=""
    
    const studentUser = await StudentAccount.findOne({where: {email: email}})
    const registrarUser = await RegistrarAccount.findOne({where: {email: email}})
    const clearanceSignUser = await ClearanceSignAccount.findOne({where: {email: email}})
    const instructorUser = await InstructorAccount.findOne({where: {email: email}})

    
    if (studentUser) {
        user = studentUser
        userType = "student"
    }else if(registrarUser){
        user= registrarUser
        userType = "registrar"
    }else if(clearanceSignUser){
        user= clearanceSignUser
        userType = "clearanceSign"
    }else if(instructorUser){
        user = instructorUser
        userType = "instructor"
    }else{
        return res.json({error: "Email Doesn't Exist"}); 
    }

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) {
            return res.json({error: "Wrong username and password combination"})
        }
        else{
            const token= sign({
                email:user.email, 
                id: user.id, 
                firstName: user.firstName, 
                lastName:user.lastName, 
                userType: userType}, 
                "importantSecret",
            );

            res.cookie("token", token, {
                maxAge: 60*60*24*30*1000,
                httpOnly: true,
            });
        
            return res.json(
                {success: {
                    verified: user.isVerified, 
                    userType: userType}
                })
        }
    })
})


module.exports = router;
