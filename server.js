const express = require('express');

//set up express app
const app = express();
const authRouter = require('./route/authRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to mongodb database
mongoose.connect('mongodb://localhost/rohitdb');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(authRouter);

const PORT =process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is port ${PORT}`)
})


  
  
