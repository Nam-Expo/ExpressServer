import { Response, NextFunction, Request, Application } from "express"
import { LogBuilder } from "../accessors/Log"
import { DataBaseError } from "../error-handling/DataBaseError"
import { Logger } from "../error-handling/Logger"
import { ServerError } from "../error-handling/ServerError"
import { Handler } from "./Handler"
import { UnAuthorizedCodes, ErrorCodes } from '../error-handling/ServerError'


export class LogHandlers extends Handler {
    logger: Logger

    constructor(app: Application, serverError: ServerError, dataBaseError: DataBaseError, logger: Logger) {
        super(app, serverError,dataBaseError)
        this.logger = logger
    }

    log(request: Request, response: Response, next: NextFunction){
        let logKey = {
            sourceIP: request.ip,
            path: request.url
        }
        this.logger.createLog(logKey)

        request.addListener("close"  , () => {
            let log = new LogBuilder()
                .setAuthorized(UnAuthorizedCodes.every(code => request.statusCode === code))
                .setPath(request.path)
                .setRequest(request)
                .setResponseCode(response.statusCode as number)
                //@ts-ignore
                .setResponseMessage(ErrorCodes[response.statusCode])
                .setSourceIP(request.ip as string)
                .setCookie(request.cookies.auth)
                .build()

            console.log('Request----------------------------------------------------------------------')
            console.table(log.toObject())
            
            this.logger.setLog(logKey, log)
        })

        next()
    }

    build(){
        this.app.use((...args) => this.log(...args))
    }
}