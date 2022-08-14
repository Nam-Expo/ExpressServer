import { NextFunction, Request, Response } from "express";
import { AccountDB } from "../types";
import { Handler } from "./Handler";
import { addServer, addUser } from "../db/insert";
import { notNull } from '../accessors/Validations'
import { getOrganization } from "../db/fetch";
import { MongoServerError } from "mongodb";

export class AccountTypeHandler extends Handler {
    async newUser(request: Request, response: Response, next: NextFunction) {
        let { username } = await this.getAccount(request)
        await addUser(username)

        response.sendStatus(200)
    }

    async newServer(request: Request, response: Response, next: NextFunction) {
        let { username } = await this.getAccount(request)
        let newServerData = {
            organization: request.body.organization
        }
        try {
            notNull(newServerData)

            try {
                let organization = await getOrganization(newServerData.organization)
                if (!organization) {
                    this.dataBaseError.sendBadQuery(response)
                }
                else {
                    await addServer(username, newServerData.organization)
                    response.sendStatus(200)
                }
            }
            catch (error) {
                if (error instanceof MongoServerError) {
                    this.dataBaseError.handleError(error as MongoServerError, response)
                }
                else {
                    this.serverError.sendInternalError(response)
                }
            }
        }
        catch (error) {
            if (error instanceof TypeError) {
                this.serverError.sendNullBody(response)
            }
            else {
                this.serverError.sendInternalError(response)
            }
        }
    }

    async newOrganization(request: Request, response: Response, next: NextFunction) {
        let { username } = await this.getAccount(request)
        let newOrganization = {
            organization: request.body.organization
        }
        try {
            notNull(newOrganization)

            let organization = await getOrganization(newOrganization.organization)

            if (!organization) {
                this.dataBaseError.sendBadQuery(response)
            }
            else {
                await addServer(username, newOrganization.organization)
                response.sendStatus(200)
            }
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                this.dataBaseError.handleError(error as MongoServerError, response)
            }
            else {
                this.serverError.sendInternalError(response)
            }
        }
    }

    build() {
        this.app.post('/newUser', (...args) => this.newUser(...args))
        this.app.post('/newServer', (...args) => this.newServer(...args))
        this.app.post('/newOrganization', (...args) => this.newOrganization(...args))
    }
}

