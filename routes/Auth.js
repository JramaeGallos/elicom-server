const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/", validateToken, async(req, res) =>{
    if(req.authenticated){
        return res.json(req.user);
    }else{
        return res.json({error:"User not Authenticated"})
    }
})

router.get("/logout", async(req, res) => {
    res.clearCookie("token")
    return res.json({success: "User Logged Out"})
})


module.exports = router;