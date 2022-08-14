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

export type Query = User | any




export type Collection = 'Accounts' | 'Organizations' | 'Servers' | 'Users'

export type AccountDB = {
    _id?: any
    email: string
    username: string
    password: string
    type?: AccountType
}

export type OrganizationDB = {
    _id?: any
    name: string
    employees: Array<string>
    image: string
    backgroundImage: string
    description: string
    posts: Array<Post>
}

export type ServerDB = {
    _id?: any
    name: string
    organization: string
    image: string
    backgroundImage: string
    description: string
    posts: Array<Post>
}

export type UserDB = {
    _id?: any
    name: string
    image: string
    backgroundImage: string
    following: Array<string>
}

export type Post = {
    owner: string
    ownerType: AccountType
    image: string
    text: string
    comments: Array<Comment>
}

export type Comment = {
    owner: string
    ownerType: AccountType
    text: string
}

export type Fetch = AccountDB | OrganizationDB

