import { uri } from "./db";
import {  Collection, AccountDB, Fetch } from "../types";
import { MongoClient } from "mongodb";

const insert = async (data: any, collectionName: Collection) => {
    const client = new MongoClient(uri)
    await client.connect()

    const collection = client.db('cluster0').collection(collectionName)
    await collection.insertOne(data)

    client.close()
}

export const addUser = async (account: AccountDB) => {
    await insert(account, "Accounts")
}
