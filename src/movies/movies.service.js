//const { where } = require("../db/connection");
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// Get request all movies / movies showing
function list(isShowing) {
  if (isShowing == "true") {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where("mt.is_showing", true)
      .groupBy("m.movie_id");
  }

  return knex("movies").select("*");
}

// Get request specific movie
function read(movieId) {
  return knex("movies").select("*").where("movie_id", movieId).first();
}

// Get theatres where specific movie is playing
function movieIsPlaying(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("*")
    .where({ movie_id: movieId, is_showing: true });
}

// get reviews for specific movieID
function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where("r.movie_id", movieId)
    .then((reviews) => {
      const result = [];
      reviews.forEach((review) => {
        result.push(addCritic(review));
      });
      return result;
    });
}

module.exports = { list, read, movieIsPlaying, readReviews };
