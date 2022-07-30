import 'dotenv/config' 
import { NextFunction, Request, response, Response } from "express"
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { AuthHandlers, TestHandlers } from './handlers'
import { ServerError } from './error-handling/ServerError'

const app = express()
const serverError = new ServerError()

app.use(
    (request: Request, response: Response, next: NextFunction) => {
        console.log('recvied req: ', request.path)
        next()
    },
    (request: Request, response: Response, next: NextFunction) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        })

        if (request.method === 'OPTIONS') {11
            response.sendStatus(200)
        }
        else {
            next()
        }
    },
    cookieParser(),
    bodyParser.json()
)

app.use(express.static('public'))

let authHandlers = new AuthHandlers(app, serverError)
authHandlers.build()

let testHandlers = new TestHandlers(app, serverError)
testHandlers.build()


app.listen(8080, () => {
    console.log('listening on: http://localhost:8080')
})