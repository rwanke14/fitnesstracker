const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
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
});


WorkoutsSchema.virtual('Workouts').get(function() {
    return this.excercises((total, exercise) => {
        return total + exercise.duration;
    }, 0)
  });


const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;