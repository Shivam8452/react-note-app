const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser')
const JWT_SER = 'gfsduhjfnisbxfyhfduhdfiuhdv'


router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 charectors').isLength({min:5})
], async (req,res)=>{
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success,error: 'Email already exists'})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
          user:{
              id: user.id
          }
      }
      const jwtData = jwt.sign(data,JWT_SER)
      success = true
      res.json({success, jwtData})
})

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
], async (req,res)=>{
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(400).json({error: "Invalid login credentials"})
        }

        const passComp = await  bcrypt.compare(password, user.password);
        if(!passComp){
            return res.status(400).json({success,error: "Invalid login credentials"})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const jwtData = jwt.sign(data,JWT_SER)
        success = true
        res.json({success,jwtData})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})



router.post('/getuser',fetchuser, async (req,res)=>{
   try {
       userId = req.user.id
       const user = await User.findById(userId).select("-password")
       res.send(user)
   } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
   }


})




module.exports = router