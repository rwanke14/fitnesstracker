const db = require('../models')


module.exports = (app) => {
    
  //get last workout
      app.get("/api/workouts", (req, res) => {
        db.Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      })

//create a new workout
      app.post("/api/workouts", (req, res) => {
        console.log('Testing post method.')
        db.Workouts.create({
          exercises: [
            req.body
          ]
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
        db.Workouts.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            $push: {
              excerises: req.body
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
       db.Workouts.find({})
          .then(dbWorkouts => {
            res.json(dbWorkouts);
          })
          .catch(err => {
            res.json(err);
          });
      });

      



}