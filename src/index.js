const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const port = process.env.port || 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  User.find({})
    .then((result) => {
      res.send(result);
    })
    .then((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.get("/tasks/:status", (req, res) => {
  const completed = req.params;
  let flag;
  if (completed === true) {
    flag = true;
  } else {
    flag = false;
  }
  console.log(req.params.status);

  Task.find({ completed: flag })
    .then((result) => {
      // res.send("here");
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

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
