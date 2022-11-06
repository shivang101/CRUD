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

    // 1 query

    // db.collection("users")
    //   .deleteMany({ age: 21 })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //2 query

    // db.collection("users")
    //   .deleteMany(
    //     { age: 21 },
    //     {
    //       name: "Shivang",
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("tasks").deleteOne({ description: "Task 1" }.then((result)=>{
    //   console.log(result);
    // });

    db.collection("tasks")
      .deleteOne({ completed: false })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
