import 'dotenv/config' 
import path from 'path'
import favicon from 'serve-favicon'
import { NextFunction, Request, Response } from "express"
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { AuthHandlers, TestHandlers } from './handlers'
import { ServerError } from './error-handling/ServerError'
import { Logger } from './error-handling/Logger'
import { DataBaseError } from './error-handling/DataBaseError'
import { LogHandlers } from './handlers/LogHandler'

const app = express()

const logger = new Logger()
const dataBaseError = new DataBaseError(logger)
const serverError = new ServerError(logger)

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
    cookieParser(),
    bodyParser.json()
)

app.use(express.static('public'))

let logHandler = new LogHandlers(app, serverError, dataBaseError, logger)
logHandler.build()

let authHandlers = new AuthHandlers(app, serverError, dataBaseError)
authHandlers.build()

let testHandlers = new TestHandlers(app, serverError, dataBaseError)
testHandlers.build()

app.listen(8080, () => {
    console.log('server is runing at port 8080')
});
