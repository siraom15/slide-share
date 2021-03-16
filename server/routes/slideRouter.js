const express = require('express');
const router = express.Router();

const controllers = require('../controllers/slideController');
const middleware = require('../middleware/middleware')
// create
router.post('/create', middleware.checkLogin, controllers.create_slide);

// read
router.get('/allslide', controllers.get_all_slide);
router.get('/all-public-slide', controllers.get_all_public_slide);
router.post('/getSlideById', controllers.get_slide_by_id);
router.get('/getmyslide', middleware.checkLogin, controllers.get_slide_by_user);
// update

router.put('/update/name/:slideId/', controllers.update_name);
router.put('/update/describe/:slideId/', controllers.update_describe);
router.put('/update/linkUrl/:slideId/', controllers.update_linkUrl);
router.put('/update/view/:slideId/', controllers.increase_view_by_one);

// delete
router.del('/delete/:slideId/', middleware.checkLogin, controllers.delete_by_id);
module.exports = router;