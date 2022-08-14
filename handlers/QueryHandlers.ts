import { NextFunction, Request, Response } from "express"
import { MongoServerError } from "mongodb"
import { notNull } from "../accessors/Validations"
import { query } from "../db/fetch"
import { Handler } from "./Handler"

export class AccountTypeHandler extends Handler {
    async getOrganizations(request: Request, response: Response, next: NextFunction){
        try {
            let data = await query('Organizations', {})
            response.status(200).json(data.reduce((array: Array<string>, organization: any) => {
                array.push(organization.name)
                return array
            }, []))
        }
        catch(error){
            if(error instanceof MongoServerError){
                this.dataBaseError.handleError(error as MongoServerError, response)
            }
            else{
                this.serverError.sendInternalError(response)
            }
        }
    }

    build() {
        this.app.get('/getOrganizations', (...args) => this.getOrganizations(...args))
    }
}

