const express = require('express');
const User = require('../module/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUSer = require('../middleware/Getuser')
;

const JWT_SECRET = 'hamzaisagood@$boy';
// ROUTE 1: Create User End Point : localhost:5000/api/auth/Createuser
router.post('/Createuser',
    body('name', 'Please Enter a user name').isLength({ min: 3 }),
    body('password', 'Please Enter a password').isLength({ min: 3 }),
    body('email', 'Plaese enter a valid email address').isEmail(),
    async (req , res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
    try {
      
      // const users = userNote(req.body)
      // users.save();
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "Sorry a user with this email already exits"})
      }

      user = await User.findOne({name: req.body.name});
      if(user){
        return res.status(400).json({error: "Sorry a user with this name already exits"})
      }

      const salt =  await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
      })

      const UserData = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(UserData, JWT_SECRET);
      console.log(authToken);
      res.send({authToken : authToken});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      //  res.json({error : 'Please Enter a Unique value', message: err.message})})
    }
})



// ROUTE 2: Login User End Point : localhost:5000/api/auth/login
router.post('/login',[
      body('email', 'Plaese enter a valid email address').isEmail(),
      body('password', 'Password cannot to be blank').exists(),
    ],
    async (req , res) => {
      // console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 

      const {email, password} = req.body;
      try{

        let user = await User.findOne({email});
          if(!user){
            return res.status(400).json({error: "Please try to login  with correct credentails"})
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if(!passwordCompare){
            return res.status(400).json({error: "Please try to login  with correct credentails"})
          }

          const payLoad = {
            user:{
              id: user.id
            }
          }
          const authToken =  jwt.sign(payLoad, JWT_SECRET);
          // console.log(authToken);
          res.send({authToken : authToken});

      }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
})



// ROUTE 3: Get loggeedin user details End Point using post: localhost:5000/api/auth/getuser / login required
router.post('/getuser', fetchUSer , async (req , res) => {
  // console.log(req.body);
  try {
    userId = req.user.id;
    const user =  await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

module.exports  = router;