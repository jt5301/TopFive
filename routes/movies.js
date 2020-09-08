const express = require("express");
const router = express.Router();
const axios = require('axios')

const omdbRootUrl = 'http://www.omdbapi.com/?'
const apiKey = `&apikey=9251ce8f`//enter key here
router.get("/search/:keywords", async (req, res, next) => {

  const movie = await axios.get(omdbRootUrl + `s=${req.params.keywords}&type=movie` + apiKey)
  res.status(200).json(movie.data);

});

module.exports = router;
