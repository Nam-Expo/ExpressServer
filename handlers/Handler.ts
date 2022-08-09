import { Application } from "express"
import { DataBaseError } from "../error-handling/DataBaseError"
import { ServerError } from "../error-handling/ServerError"

export class Handler {
    app: Application
    serverError: ServerError
    dataBaseError: DataBaseError

    constructor(app: Application, serverError: ServerError, dataBaseError: DataBaseError) {
        this.app = app
        this.serverError = serverError
        this.dataBaseError = dataBaseError
    }
}