const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const middleware = require('../middleware/middleware')

//create
router.post('/create', controller.create_user);

//read
router.post('/auth',controller.check_user);
router.post('/userdata',controller.search_user)
router.post('/mydata', middleware.checkLogin ,controller.get_mydata)
//update

// @body {
//     slideId 
// }

router.post('/saveSlide', middleware.checkLogin, controller.save_slide)


// delete


module.exports = router;