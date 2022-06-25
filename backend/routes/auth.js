const express = require('express');
const User = require('../module/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');



router.post('/',

    body('name', 'Please Enter a user name').isLength({ min: 3 }),
    body('password', 'Please Enter a password').isLength({ min: 3 }),
    body('email', 'Plaese enter a valid email address').isEmail(),
    (req , res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
    // const users = userNote(req.body)
    // users.save();
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
     res.json({error : 'Please Enter a Unique value', message: err.message})})
    // res.send(req.body);
})

module.exports  = router;