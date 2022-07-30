import 'dotenv/config' 
import { getAccount } from "./db/fetch";
import { getHash } from './authentication/crypto'
import { sign, verify } from './authentication/jwt'
import { JWTVerified } from './types';


getAccount('jeff').then((res) => {
    console.log(res)
})

let user = { username: 'magnusreeves', password: 'jeff', email: 'magnusreeves@rogers.com'}

let hash = getHash(user.password)
let testHash = getHash(user.password)

if(hash !== testHash){
    throw new Error('hash algo not creating same hash')
}

user.password = hash

let jwt = sign(user)
let jwtTest = sign(user)

let userJWT = verify({
    username: user.username,
    password:  user.password
}, jwt) as JWTVerified


console.log(userJWT.password === user.password)