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

export const addAuth = async (account: AccountDB) => {
    console.log('inserting account: ', account)
    await insert(account, "Accounts")
}

export const addUser = async (username: string) => {
    return await insert({
        username,
        following: []
    }, "Users")
}

export const addServer = async (username: string, organization: string) => {
    return await insert({
        username,
        organization
    }, "Servers")
}

export const addOrganization = async (organization: string) => {
    return await insert({
        organization
    }, "Organizations")
}