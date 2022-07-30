import { createClient } from "./db";
import { Query, Collection, AccountDB, Fetch, LoginUser } from "../types";
import { MongoClient } from "mongodb";



const fetch = async (query: Query, collectionName: Collection): Promise<null | Fetch> => {
    const client = createClient()

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

export const login = async (user: LoginUser): Promise<boolean> => {
    console.log('querying db with', user)
    let res = await fetch(user, 'Accounts')
    console.log('db replied with value, ', res)
    return res ? true: false
}