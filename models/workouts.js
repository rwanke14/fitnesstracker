const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    //setting date to collect date for each workout to add later to the dashboard and recap on homepage.
    day: {
        type: Date,
        default: Date.now
    },

    //setting up exercise array for collecting information in the collection on each workout.
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Enter an excercise type!'
            },
            name: {
                type: String,
                trim: true,
                required: 'Enter an excercise name!'
            },
            duration: {
                type: Number,
                required: "Enter duration of excercise!"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }

        }
    ]
},

);


WorkoutsSchema.virtual('Workouts').get(function() {
    return this.excercises((total, exercise) => {
        return total + exercise.duration;
    }, 0)
  });

//exporting model
const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;