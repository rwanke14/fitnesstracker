const db = require("../models");

module.exports = (app) => {

    app.get("/excercise", (req, res) => {
        db.Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });
      

      app.get("/", (req, res) => {
        db.Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });


      app.get("/stats", (req, res) => {
        db.Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });


      app.post("/exercise", ({ body }, res) => {
        db.Workouts.create(body)
          .then(({ _id }) => db.Workouts.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });


      



}