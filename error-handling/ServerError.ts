import { Response } from "express";

const ErrorCodes = Object.freeze({
    500: 'Internal Error',
    501: 'Expired Token',
    502: 'Bad Token',
    503: 'Bad Login',
    504: 'Account does not exist',
    505: 'Unauthorized Access',
    506: 'null body'
})


export class ServerError {
    sendInternalError(response: Response){
        response.status(500).send(ErrorCodes[500])
    }

    sendExpiredToken(response: Response){
        response.status(501).send(ErrorCodes[501])
    }

    sendBadToken(response: Response){
        response.status(502).send(ErrorCodes[502])
    }

    sendBadLogin(response: Response){
        response.status(503).send(ErrorCodes[503])
    }

    sendAccountDoesNotExists(response: Response){
        response.status(504).send(ErrorCodes[504])
    }

    sendUnAuthorizedAccess(response: Response){
        response.status(505).send(ErrorCodes[505])
    }

    sendNullBody(response: Response){
        response.status(506).send(ErrorCodes[506])
    }
}