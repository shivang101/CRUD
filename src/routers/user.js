const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/users", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
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

module.exports = router;