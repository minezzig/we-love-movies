//import router, controller, and the method error message
const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//router.route - the particular route for Theaters, and each method
router.route("/").get(controller.list).all(methodNotAllowed);


module.exports = router;
