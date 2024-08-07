const jwt = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    const accessToken = req.cookies.token

    if(!accessToken){
        return res.json({error:"User not Authenticated!"})
    }else{
        try{
            const validToken = jwt.verify(accessToken, "importantSecret")

            if(validToken){
                req.user = validToken;
                req.authenticated = true;
                next();
            }
        }
        catch(err){
            return res.status(400).json({error: err})
        }
    }

}

module.exports = {validateToken}