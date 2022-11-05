//CRUD create read update delete

const mongodb = require("mongodb");

// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();
console.log(id.toHexString());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Connected Correctly`);
    const db = client.db(databaseName);

    // db.collection("users").findOne(
    //   { _id: new ObjectId("636683eac42f6336a59b86b4") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );

    db.collection("tasks").findOne(
      {
        _id: new ObjectId("636684f745ece204057ea041"),
      },
      (error, result) => {
        if (error) {
          return console.log("unable to fetch");
        }
        console.log(result);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, users) => {
        if (error) {
          return console.log("Unable to find");
        }
        console.log(users);
      });
  }
);
