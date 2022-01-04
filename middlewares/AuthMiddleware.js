const { verify } = require("jsonwebtoken");


const validateToken = (req, res, next) => {
    const accessToke = req.header("accessToken");

    if(!accessToke) return res.json({error: "User not Logged in!"});

    
    try {
        const validToke =  verify(accessToke, "Bank");
        req.user = validToke;
        if(validToke){
            return next();
        }
        
    } catch (err){
        return res.json({error: err})
    }
}

module.exports = {validateToken};