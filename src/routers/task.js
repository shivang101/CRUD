const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/tasks/:id", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(error.message);
  }
});

router.get("/tasks/:id", async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
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

// router.get("/tasks/:status", (req, res) => {
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

module.exports = router;
