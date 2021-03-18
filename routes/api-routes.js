const Workouts = require('../models/workouts.js')


module.exports = (app) => {
    
  //get last workout

      app.get("/api/workouts/", (req, res) => {
        Workouts.aggregate([
          {
            $limit: 7
          },
          {
            $addFields: {
              totalDuration: {$sum: "$exercises.duration"}
            }
          },
        ])
          .then(Workouts => {
            console.log(Workouts)
            res.json(Workouts);
          })
          .catch(err => {
            res.json(err);
          });
      })

      app.get("/api/workouts", (req, res) => {
        Workouts.find({})
          .then(Workouts => {
            console.log(Workouts)
            res.json(Workouts);
          })
          .catch(err => {
            res.json(err);
          });
      })

//create a new workout
      app.post("/api/workouts", (body, res) => {
        console.log(body)
        console.log('Testing post method.')
        Workouts.create(body)
          .then(Workouts => {
            console.log(body)
            res.json(Workouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

 //update/add to a workout
      app.put("/api/workouts/:id", (req, res) => {
        console.log('testing put method')
        Workouts.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            $push: {
              exercises: req.body
            }
          },
          {
            new: true
          }
        ).then(Workouts => {
          console.log(req.body)
          console.log(req.params.id)
          res.json(Workouts);
        }).catch(err => {
          res.json(err);
        });;
      });

    //set up a range for ordering the dashboard.
      app.get("/api/workouts/range", (req, res) => {
        Workouts.aggregate([
          {
            $limit: 7
          },
          {
            $addFields: {
              totalDuration: {$sum: "$exercises.duration"}
            }
          },
        ])
          .then(Workouts => {
            res.json(Workouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

      



}