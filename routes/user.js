const express = require('express');
const router = express.Router();

// import controller
const { userById } = require('../controllers/user');
const { requireSignin, adminMiddleware,isAuth ,isAdmin} = require('../controllers/auth');
const { read, update } = require('../controllers/user');

router.get('/user/:id', read);
router.put('/user/update/:id',requireSignin,update);
router.put('/admin/update/:id',requireSignin,adminMiddleware,update);

router.param('userId',userById);
module.exports = router;
