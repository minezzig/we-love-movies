const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function destroy(req, res, next) {
  await reviewsService.delete(res.locals.reviewId);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {...req.body.data, review_id: res.locals.reviewId}
  const update = await reviewsService.update(updatedReview);
  const data = await reviewsService.format(updatedReview.review_id)
  console.log(data)
  res.json({data});
}

//----Verifications-----

async function verifyReview(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.reviewId = review.review_id;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

module.exports = {
  update: [asyncErrorBoundary(verifyReview), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(verifyReview), asyncErrorBoundary(destroy)],
};
