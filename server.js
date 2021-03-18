const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


//Set up port
const PORT = process.env.PORT || 3000;

// const db = require("./models");

//Middlewear
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Setting up connection to create collection and add seeders.
   mongoose.connect(
     process.env.MONGODB_URI || 'mongodb://localhost/workout',
     {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
     }
   );

//requiring routes for apis and for html.
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//opening up the port.
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});