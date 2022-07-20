import { NextFunction, Request, Response } from "express"
import express from "express"
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'

const app = express()

app.use(
    (request: Request, response: Response, next: NextFunction) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-PINGOTHER'
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

app.get('/', (request: Request, response: Response) => {
    response.send('<div>James is gay</div>')
})

app.listen(8080, () => {
    console.log('listening on: http://localhost:8080')
})