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

    // db.collection("users").insertOne(
    //   {
    //     name: "vikram",
    //     age: 21,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert error");
    //     }
    //     console.log(result.insertedId);
    //   }
    // );
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Shivang",
    //       age: 21,
    //     },
    //     {
    //       name: "Arnav",
    //       age: 15,
    //     },
    //   ],
    //   (error, result) => {
    //     {
    //       if (error) {
    //         return console.log("Unable to insert error");
    //       }
    //       console.log(result.insertedIds, result.insertedCount);
    //     }
    //   }
    // );
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Task 1",
    //       completed: true,
    //     },
    //     {
    //       description: "Task 2",
    //       completed: false,
    //     },
    //     {
    //       description: "Task 3",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to connect");
    //     }
    //     console.log(result.insertedCount, result.insertedIds);
    //   }
    // );
  }
);
