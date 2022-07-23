import { MongoClient } from "mongodb"
import { dbPass } from "../enviromentVar";

// Connection URI
const uri =
  `mongodb+srv://magnus1298:${dbPass}@cluster0.jzend.mongodb.net/?retryWrites=true&w=majority`
// Create a new MongoClient
const client = new MongoClient(uri);

async function test() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to database");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
test().catch(console.dir);

export { uri }