import { Request } from "express";
import { notNull } from './Validations'

export type RequestLog = {
    sourceIP: string 
    path: string
    authorized: boolean
    responseCode: number
    responseMessage: string 
    request: Request
    cookie: string | undefined
}

type PrintableLog = {
    sourceIP: string 
    path: string
    authorized: boolean
    responseCode: number
    responseMessage: string 
    cookie: string | undefined
}

export class Log {
    request: Request
    sourceIP: string 
    path: string 
    authorized: boolean
    responseCode: number
    responseMessage: string
    requestObj: RequestLog
    cookie: string | undefined

    constructor(request: RequestLog){
        notNull(request)

        this.requestObj = request
        this.request = request.request
        this.sourceIP = request.sourceIP
        this.path = request.path
        this.authorized = request.authorized
        this.responseCode = request.responseCode
        this.responseMessage = request.responseMessage
        this.cookie = request.cookie
    }

    toObject(): PrintableLog {
        let { request, ...printable } = this.requestObj
        return printable
    }
}


export class LogBuilder {
    request: Request | undefined
    sourceIP: string | undefined
    path: string | undefined
    authorized: boolean | undefined
    responseCode: number | undefined
    responseMessage: string | undefined
    cookie: string | undefined

    constructor(){
        this.request = undefined
        this.sourceIP = undefined
        this.path = undefined
        this.authorized = undefined
        this.responseCode = undefined
        this.responseMessage = undefined
        this.cookie = undefined
    }

    setRequest(request: Request){
        this.request = request
        return this
    }

    setSourceIP(sourceIP: string){
        this.sourceIP = sourceIP
        return this
    } 
    
    setPath(path: string){
        this.path = path
        return this
    }

    setAuthorized(authorized: boolean){
        this.authorized = authorized
        return this
    }

    setResponseCode(responseCode: number){
        this.responseCode = responseCode
        return this
    }

    setResponseMessage(responseMessage: string){
        this.responseMessage = responseMessage
        return this
    }

    setCookie(cookie: string | undefined){
        this.cookie = cookie
        return this
    }

    build(): Log {
        return new Log({
            request: this.request as Request,
            sourceIP: this.sourceIP as string,
            path: this.path as string,
            authorized: this.authorized as boolean,
            responseCode: this.responseCode as number,
            responseMessage: this.responseMessage as string,
            cookie: this.cookie
        })

    }
}