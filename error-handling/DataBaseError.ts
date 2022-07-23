import { Response } from "express";
import { MongoServerError } from "mongodb";

interface ErrorCodesADT {
    [key: number] : string
}

const ErrorCodes: ErrorCodesADT = Object.freeze({
    550: 'Exists',
    551: 'Expired Token',
    552: 'Bad Token',
    553: 'Bad Login',
    554: 'Account Exists',
    555: 'Unauthorized Access',
    590: 'unknown'
})


export const dataBaseError = (error: MongoServerError, response: Response) => {
    let code = 590;
    console.log(error)
    switch(error.code){
        case 11000:
            code = 550
    }

    response.status(code).send(ErrorCodes[code])
}