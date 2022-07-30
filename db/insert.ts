import { createClient } from "./db";
import {  Collection, AccountDB, Fetch } from "../types";
import { MongoClient } from "mongodb";

const insert = async (data: any, collectionName: Collection) => {
    const client = createClient()
    
    await client.connect()

    const collection = client.db('cluster0').collection(collectionName)
    await collection.insertOne(data)

    await client.close()
}

export const addUser = async (account: AccountDB) => {
    console.log('inserting account: ', account)
    await insert(account, "Accounts")
}
