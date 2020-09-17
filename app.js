const express = require('express');
const morgan = require('morgan');
const indexRouter = require("./routes/movies");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
require('dotenv/config')
const PORT = process.env.PORT || 3001; // Step 1

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/movies", indexRouter);
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/build/'));
console.log('what is this', process.env.mongodbConnect)
mongoose.connect(process.env.mongodbConnect, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to db')
})

// HTTP request logger
app.use(morgan('tiny'));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
