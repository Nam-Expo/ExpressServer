export type AccountType = 
    'user' | 'server' | 'company'


export type User = {
    email: string
    username: string
    password: string
    type: AccountType
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

export type JWTVerified = {
    username: string
    password: string
    iat: number
    exp: number
}

export type LoginUser = {
    username: string
    password: string
}

export type OtherUser = {
    username: string
}