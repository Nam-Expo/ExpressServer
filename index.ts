import 'dotenv/config' 
import { NextFunction, Request, Response } from "express"
import express from "express"
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'
import { User, Auth, AccountDB } from "./types"
import { verify } from "./authentication/jwt"
import { getAccount } from "./db/fetch"
import { addUser } from "./db/insert"
import path from 'path'
import { ServerError } from './error-handling/ServerError'

const app = express()
const serverError = new ServerError()

app.use(
    (request: Request, response: Response, next: NextFunction) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        })

        if (request.method === 'OPTIONS') {
            response.sendStatus(200)
        }
        else {
            next()
        }
    },
    cookieparser(),
    bodyParser.json()
)

app.use(async (request: Request, response: Response, next: NextFunction) => {
    if(request.cookies.auth){
        let auth: Auth = request.cookies.auth
        let account: AccountDB | null = await getAccount(auth.username)

        if(account === null){
            serverError.sendAccountDoesNotExists(response)
        }
        else {
            let jwtVerify: string = verify(auth, account.password)

            if(jwtVerify === 'expired' || jwtVerify === 'bad'){
                let errorFunction = jwtVerify ==='expired' ? serverError.sendExpiredToken : serverError.sendBadToken
                errorFunction(response)
            }
            else {
                if(jwtVerify !== auth.username){
                    serverError.sendBadToken(response)
                }
                else{
                    next()
                }
            }
        }
    }
    else{
        if(request.path === '/register' || request.path === '/test'){
            next()
        }
        else{
            serverError.sendUnAuthorizedAccess(response)
        }
    }
})

app.post('/register', async (request: Request, response: Response) => {
    let user: User = request.body

    let account = await getAccount(user.username)

    if(account !== null){
        response.json({ code: 504, message: 'account exists' })
    }
    else {
        let res = await addUser(user)
        console.log(res)
        response.json({ code: res === 'ok' ? 200 : 504, message: res })
    }
})

app.get('/test', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, 'test-pages/register.html'));
})

app.listen(8080, () => {
    console.log('listening on: http://localhost:8080')
})