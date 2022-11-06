const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      //console.log(result);
      //same thing
      console.log(user);

      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(400).send(error.message);
      res.send(error);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
