const express = require('express');
const router = express.Router();

router.get('/', (req , res) => {
    // obj = {
    //     name : "Hamza Waseem",
    //     number : 34
    // }
    res.json(obj);
})

module.exports  = router;