const express = require('express');
const router = express.Router();

// import controller
const { signup, accountActivation, signin,googleLogin, forgotPassword,
    resetPassword, } = require('../controllers/auth');

// import validators
const { userSignupValidator, userSigninValidator,    forgotPasswordValidator,
    resetPasswordValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

router.post('/google-login', googleLogin);
module.exports = router;
