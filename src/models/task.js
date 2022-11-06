const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
    cast: false, // Disable casting just for this path
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;