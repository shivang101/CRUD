const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is not valid");
//       }
//     },
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("password can not be 'password' ");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "Shivang Mathur",
//   age: 21,
//   email: "shivangmathur101@gmail.com",
//   password: "Shivag101",
// });

// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const toDo = new Task({
  description: "Complete the assignment",
  completed: false,
});

toDo
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
