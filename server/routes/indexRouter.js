const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.status(200).json({
        "success" : "Server OK"
    })
})

module.exports = router;