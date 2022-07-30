import { Application } from "express"
import { ServerError } from "../error-handling/ServerError"

export class Handler{
    app: Application
    serverError: ServerError

    constructor(app: Application, serverError: ServerError) {
        this.app = app
        this.serverError = serverError
    }
}