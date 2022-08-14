import { Application, Request } from "express"
import { DataBaseError } from "../error-handling/DataBaseError"
import { ServerError } from "../error-handling/ServerError"
import { AccountDB } from "../types"

export class Handler {
    app: Application
    serverError: ServerError
    dataBaseError: DataBaseError

    constructor(app: Application, serverError: ServerError, dataBaseError: DataBaseError) {
        this.app = app
        this.serverError = serverError
        this.dataBaseError = dataBaseError
    }

    getAccount(request: Request){
        return new Promise<AccountDB>((resolve) => {
            request.addListener('account', resolve)
            request.emit('getAccount')
        })
    }
}