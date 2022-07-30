import { NextFunction, Request, Response } from "express";
import { Handler } from "./Handler";


export class TestHandlers extends Handler{
    testAuth(request: Request, response: Response, next: NextFunction){
        response.send('Authorized')
    } 

    build(){       
        this.app.get('/testAuth',  (...args) => this.testAuth(...args))
    }
}




