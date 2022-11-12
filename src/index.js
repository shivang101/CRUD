const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const { findByIdAndDelete } = require("./models/task");

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }

  // user
  //   .save()
  //   .then((result) => {
  //     //console.log(result);
  //     //same thing
  //     console.log(user);

  //     res.status(201).send(result);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error.message);
  //     res.send(error);
  //   });
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.send(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    console.log(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.send(404).send();
    }
    res.send(task);
  } catch (e) {
    res.send(e);
  }
});

// app.get("/tasks/:status", (req, res) => {
//   const completed = req.params;
//   console.log("here");

//   let flag;
//   if (completed === true) {
//     flag = true;
//   } else {
//     flag = false;
//   }
//   console.log(req.params.status);

//   Task.find({ completed: flag })
//     .then((result) => {
//       // res.send("here");
//       res.status(200).send(result);
//     })
//     .catch((error) => {
//       res.status(500).send(error.message);
//     });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
