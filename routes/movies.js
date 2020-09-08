const express = require("express");
const router = express.Router();
const axios = require('axios')

const omdbRootUrl = 'http://www.omdbapi.com/?'
const apiKey = `&apikey=${process.env.OMDBKey}`//enter key here
router.get("/search/:keywords", async (req, res, next) => {
  console.log(req.params)
  const searchTerm = req.params.keywords
  const movie = await axios.get(omdbRootUrl + `s=${req.params.keywords}&type=movie` + apiKey)
  res.status(200).json(movie.data);

});

module.exports = router;
