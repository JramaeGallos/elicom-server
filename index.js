const express = require('express')
const app = express() 
const cors = require("cors")
const cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };

app.use(cors(corsOptions));
app.use(express.json())

app.use(cookieParser())
const db = require('./models')

// app.use(nodemailer)


//General User Login Router
const userLoginRouter = require('./routes/UserLogin')
app.use("/login", userLoginRouter);

//Auth Router
const profileRouter = require('./routes/Auth')
app.use("/auth", profileRouter);

// Fetch list of user accounts
const getUserAccountRouter = require('./routes/GetUserAccount')
app.use("/getUser", getUserAccountRouter)

// Delete specific user
const delUserAcct = require('./routes/DeleteUserAcct')
app.use("/delete", delUserAcct)

//update/change values in student user account
const updateStudAcct = require('./routes/UpdateStudentAccount')
app.use("/update", updateStudAcct)

//get table row in the student account according to enrollment status
const getEnrolledStud = require('./routes/GetTableRows')
app.use("/get-student", getEnrolledStud)

//get and set system management values
const systemMgt = require('./routes/SystemManagement')
app.use("/management", systemMgt)

//create and retrieve section list by year level, degree program
const sectionList = require("./routes/SectionAPI")
app.use("/section", sectionList)

// add enrolled student / get enrolled student list in a section
const classList = require("./routes/UpdateStudentSection")
app.use("/enroll", classList)

// add instructor to a section
const sectionInstructorList = require("./routes/UpdateInstructorSection")
app.use("/instructor-section", sectionInstructorList)

// access section list by clearance signatories
const clearanceSignClassList = require("./routes/ClearanceAccessSection")
app.use("/clearanceSign", clearanceSignClassList)

// update instructor remark
const updInstructorRemark = require("./routes/UpdateInstructorRemark")
app.use("/inst-remark", updInstructorRemark)

// update clearanceSign remark
const updClearanceSignRemark = require("./routes/UpdateClearanceSignRemark")
app.use("/clearance-remark", updClearanceSignRemark)

// update registrar remark
const updregistrarRemark = require("./routes/UpdateRegistrarRemark")
app.use("/registrar-remark", updregistrarRemark)

// student access remarks of instructor and clearanceSign
const accessRemarks = require("./routes/StudentAccessRemarks")
app.use("/student-remark", accessRemarks)

//email verification
const verifyEmail = require("./routes/EmailVerification")
app.use("/email", verifyEmail)


db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
})



 