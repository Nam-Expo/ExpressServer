import { NextFunction, Request, Response } from "express";

export class FollowersHandler {
    addFollower(request: Request, response: Response, next: NextFunction){
        let currentUser = request.cookies.auth.username
        let newUser = request.cookies.auth.username
        
    }
}