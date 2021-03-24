const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')


router.get('/', (req, res, next) => {
    res.json({
        success: "api worked"
    })
});
router.get('/test', middleware.checkLogin, (req, res, next) => {
    res.json({
        success: "test success"
    })
});
router.post('/imgTest', (req, res) => {
    res.status(404).json({
        "error": "asdasd"
    });
})


module.exports = router;