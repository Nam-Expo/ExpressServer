import { NextFunction, Request, Response } from "express";
import { Handler } from "./Handler";


export class TestHandlers extends Handler{
    testAuth(request: Request, response: Response, next: NextFunction){
        response.send('Authorized')
    } 

    testProcess(request: Request, response: Response, next: NextFunction){
        setTimeout(() => {
            response.send('ok')
        }, 5000)
    }

    build(){       
        this.app.get('/testAuth',  (...args) => this.testAuth(...args))
        this.app.get('/testProcess',  (...args) => this.testProcess(...args))
    }
}




