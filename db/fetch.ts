import { createClient } from "./db";
import { Query, Collection, AccountDB, Fetch, LoginUser, OrganizationDB } from "../types";

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
    let res = await fetch(user, 'Accounts')
    return res ? true: false
}

export const getOrganization = async (organization: string): Promise<OrganizationDB> => {
    return await fetch({ name: organization }, 'Organizations') as OrganizationDB
}

export const query = async (collection: Collection, query: any): Promise<any> => {
    return await fetch(query, collection) as OrganizationDB
}