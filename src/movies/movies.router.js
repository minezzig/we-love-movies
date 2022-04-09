//import router, controller, and the method error message
const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//router.route - the particular route for Movies, and each method
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(controller.movieIsPlaying)
  .all(methodNotAllowed);
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed);

module.exports = router;
