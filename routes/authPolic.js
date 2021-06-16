const { Router } = require("express");
const poliController = require("../controllers/poliController");

const router = Router();

///Auth Routes
router.get("/login", poliController.login_get);
router.get("/signup", poliController.signup_get);
router.post("/login", poliController.login_post);
router.post("/signup", poliController.signup_post);
router.get("/index", poliController.index);
router.get("/loggedin", poliController.loggedin);
router.get("/logout", poliController.logout_get);
//ambulance
router.get("/ambulance", poliController.ambulance_get);
router.post("/ambulance", poliController.ambulance_post);
//consulting
router.get("/consulting", poliController.consulting_get);
router.post("/consulting", poliController.consulting_post);

router.get("/analyse", poliController.analyse_get);

router.get("/doctorMeet", poliController.doctor_get);
router.post("/doctorMeet", poliController.doctor_post);

router.get("/request", poliController.request_get);
router.post("/request", poliController.request_post);
router.get("/posts", poliController.posts_get);

//analyse
router.get("/qon", poliController.qon_get);
router.get("/umumiy", poliController.umumiy_get);
router.get("/covid", poliController.covid_get);
router.get("/kardiogramma", poliController.kardiogramma_get);
router.get("/peshob", poliController.peshob_get);

module.exports = router;
