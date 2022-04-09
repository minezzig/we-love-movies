const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const isShowing = req.query.is_showing;
  const data = await moviesService.list(isShowing);
  res.json({ data });
}

function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function movieIsPlaying(req, res, next) {
  const data = await moviesService.movieIsPlaying(req.params.movieId);
  res.json({ data });
}

async function readReviews(req, res, next) {
  const data = await moviesService.readReviews(req.params.movieId);
  res.json({ data });
}

//-----validate----
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieIsPlaying: [asyncErrorBoundary(movieExists), movieIsPlaying],
  readReviews: [asyncErrorBoundary(movieExists), readReviews],
};
