import { uri } from "./db";
import { Query, Collection, AccountDB, Fetch } from "../types";
import { MongoClient } from "mongodb";



const fetch = async (query: Query, collectionName: Collection): Promise<null | Fetch> => {
    const client = new MongoClient(uri);

    await client.connect();

    const database = client.db('cluster0').collection(collectionName);

    const data = await database.findOne(query) as unknown as null | Fetch
    
    await client.close();
    
    return data  
}

export const getAccount = async (username: string): Promise<null | AccountDB> => {
    let res = await fetch({ username }, 'Accounts')

    return res as AccountDB | null
}