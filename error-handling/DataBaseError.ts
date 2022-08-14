import { Response } from "express";
import { MongoServerError } from "mongodb";
import { ErrorHandler } from "./ErrorHandler";

interface ErrorCodesADT {
    [key: number]: string
}

const ErrorCodes: ErrorCodesADT = Object.freeze({
    550: 'Exists',
    551: 'Bad Query',
    590: 'unknown'
})


export class DataBaseError extends ErrorHandler {

    handleError(error: MongoServerError, response: Response) {
        let code = 590;

        switch (error.code) {
            case 11000:
                code = 550

            default:
                console.error(error)
        }

        response.status(code).send(ErrorCodes[code])
    }

    sendBadQuery(response: Response) {
        response.status(551).send(ErrorCodes[551])
    }
}