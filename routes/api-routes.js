const Workouts = require('../models/workouts.js')


module.exports = (app) => {
    
  //get last workout
      app.get("/api/workouts", (req, res) => {
        Workouts.find({})
          .then(dbWorkouts => {
            console.log(dbWorkouts)
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      })

      app.get("/api/workouts", (req, res) => {
        Workouts.aggregate([
          {
            $set: {
              totalDuration: {$sum: req.body.duration}
            }
          },
          {
            $limit: 7
          },
          {
            $sort: 1
          }

        ])
          .then(dbWorkouts => {
            console.log(dbWorkouts)
            console.
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      })

//create a new workout
      app.post("/api/workouts", (req, res) => {
        console.log(body)
        console.log('Testing post method.')
        Workouts.create({
          exercises: req.body
        })
          .then(dbWorkouts => {
            res.json(dbWorkouts);
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
          res.json(Workouts);
        }).catch(err => {
          res.json(err);
        });;
      });

    //set up a range for ordering the dashboard.
      app.get("/api/workouts/range", (req, res) => {
       Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

      



}