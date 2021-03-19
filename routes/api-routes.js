const Workouts = require('../models/workouts.js')


module.exports = (app) => {
    
  //get last workout
  //Limit workouts to 7 and grabbing total sum of duration for workouts along with data in collection.

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
//passing in body param to collect information.
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
 //adding in the id we want to pinpoint, and $push to add to the array for exercise.
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
    //Limiting the number of workouts to 7 and setting up a field for the sum of total duration of workouts.
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