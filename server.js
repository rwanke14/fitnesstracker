const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./Develop/models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });


db.Workouts.create({ name: "Workouts" })
  .then(dbWorkouts => {
    console.log(dbWorkouts);
  })
  .catch(({message}) => {
    console.log(message);
  });


  require("./Develop/routes/html-routes.js")(app);
  require("./Develop/routes/api-routes.js")(app);




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });