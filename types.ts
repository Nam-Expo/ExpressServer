export type User = {
    email: string
    username: string
    password: string
}

export type Auth = {
    username: string
    token: string
}

export type Query = User | any

export type Collection = 'Accounts'

export type AccountDB = {
    _id?: any,
    email: string
    username: string
    password: string
}

export type Fetch = AccountDB | {posts: string}

