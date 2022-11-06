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
    /* ///////////////////////////////////////////////////////////////////
    const updatePromise = db.collection("users").updateOne(
      { _id: new ObjectId("636683eac42f6336a59b86b4") },
      {
        $set: {
          age: 69,
        },
      }
    );

    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
*/
    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("636683eac42f6336a59b86b4") },
    //     {
    //       $set: {
    //         age: 69,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("636683eac42f6336a59b86b4") },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //update all with age >15 with name = new SHivang with age 15
    // db.collection("users").updateMany(
    //   {
    //     age: { $gt: 20 },
    //   },
    //   {
    //     $set: { name: "New Shivang with age > 15" },
    //   }
    // ).then((result) => {
    //   console.log(result);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    //empty filter object to update all
    db.collection("tasks")
      .updateMany(
        {},
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
