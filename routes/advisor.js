const express = require("express");
const router = express.Router();

const {read, create,advisorById,listBySearch,photo,resume,list,remove,
    update
} = require("../controllers/advisor");

const { requireSignin,isAdmin,isAuth,  adminMiddleware } = require("../controllers/auth");
const { userById } = require('../controllers/user');

router.get("/advisor/:advisorId", read);

router.delete("/advisor/:advisorId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/advisor/:advisorId/:userId", requireSignin, isAuth, isAdmin, update);

router.get("/advisors", list); 
router.post("/advisor/create/:userId", requireSignin, isAuth,isAdmin,create); 
router.post("/advisors/by/search",listBySearch);
router.get("/advisor/photo/:advisorId", photo);
router.get("/advisor/resume/:advisorId", resume);

router.param('userId', userById);
router.param('advisorId', advisorById);

module.exports = router;