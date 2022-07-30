import { MongoClient, MongoClientOptions } from "mongodb"
import { dbPass } from "../enviromentVar";

// Connection URI
const uri =
  `mongodb+srv://magnus1298:${dbPass}@cluster0.jzend.mongodb.net/?retryWrites=true&w=majority`

const options = {

}

const createClient = () => {
    return new MongoClient(uri, options)
}


async function test() {
    let client = await createClient()
    try { 
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to database");
    } 
    catch(error){
        console.error(error)
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function indexs(){
    try {
        let client = await createClient()
        await client.db('cluster0').collection('Accounts').createIndex({ email: 1 }, { unique:true })
        await client.db('cluster0').collection('Accounts').createIndex({ username: 1 }, { unique:true })
        await client.close();
    }
    catch(error){
        console.error(error)
    }
}

test().catch(console.dir);
indexs().catch(console.dir);


export { createClient }