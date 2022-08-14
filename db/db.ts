import { MongoClient, MongoServerSelectionError } from "mongodb"
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
        if(error instanceof MongoServerSelectionError){
            throw new Error('cant connect to DB, most likely trying to access from a non approved IP address')
        }
        else{
            console.error(error)
        }
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function accountIndexs() {
    try {
        let client = await createClient()
        await client.db('cluster0').collection('Accounts').createIndex({ email: 1 }, { unique:true })
        await client.db('cluster0').collection('Accounts').createIndex({ username: 1 }, { unique:true })

        await client.close()
    }
    catch(error){
        console.error(error)
    }
}

async function organizationIndexs(){
    try {
        let client = await createClient()
        await client.db('cluster0').collection('Organizations').createIndex({ name: 1 }, { unique:true })
        
        await client.close();
    }
    catch(error){
        console.error(error)
    }
}

async function serverIndexs(){
    try {
        let client = await createClient()
        await client.db('cluster0').collection('Servers').createIndex({ username: 1 }, { unique:true })
        
        await client.close();
    }
    catch(error){
        console.error(error)
    }
}

async function userIndexes(){
    try {
        let client = await createClient()
        await client.db('cluster0').collection('Users').createIndex({ username: 1 }, { unique:true })
        
        await client.close();
    }
    catch(error){
        console.error(error)
    }
}

test()
accountIndexs()
organizationIndexs()
serverIndexs()
userIndexes()

export { createClient }