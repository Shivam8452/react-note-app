const jwt = require('jsonwebtoken')
const JWT_SECRET = "gfsduhjfnisbxfyhfduhdfiuhdv"
const fetchuser = (req,res,next)=>{

    const token = req.header('access-token');
    if(!token){
        res.status(400).send({error:"Please authenticate"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

}



module.exports = fetchuser