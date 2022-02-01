const express = require('express');
const router = express.Router();

const { create,list} = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireSignin,  create);
router.get('/categories', list);

router.param('userId', userById);

module.exports = router;
module.exports = router;