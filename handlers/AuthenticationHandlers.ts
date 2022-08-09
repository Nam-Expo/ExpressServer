import { Application, Request, NextFunction, Response } from "express"
import { verify, sign } from "../authentication/jwt"
import { MongoServerError } from "mongodb"
import { AuthBuilder, LoginUserBuilder, UserBuilder } from "../accessors/User"
import { getAccount, login } from "../db/fetch"
import { addUser } from "../db/insert"
import { DataBaseError } from "../error-handling/DataBaseError"
import { ServerError } from "../error-handling/ServerError"
import { AccountDB, Auth, JWTVerified, LoginUser, User } from "../types"
import equal from 'deep-equal'
import { Handler } from "./Handler"


const generateCookie = (response: Response, user: LoginUser) => {
    let jwt = sign(user)
    
    let auth: Auth = {
        username: user.username,
        token: jwt
    }

    response.cookie('auth', auth)
}

export class AuthHandlers extends Handler {
    async authenticationMiddleWear(request: Request, response: Response, next: NextFunction) {
        if (request.path === '/register' || request.path === '/test' || request.path === '/login' || request.path === '/logout')  {
            next()
        }
        else {
            if (request.cookies.auth) {
                let auth: Auth = new AuthBuilder()
                    .setToken(request.cookies.auth.token)
                    .setUsername(request.cookies.auth.username)
                    .build()
    
                let account: AccountDB | null = await getAccount(auth.username)
                console.table(account)
                if (account === null) {
                    this.serverError.sendAccountDoesNotExists(response)
                }
                else {
                    let jwtVerify = verify(account, auth.token)
    
                    if (jwtVerify === 'expired' || jwtVerify === 'bad') {
                        let errorFunction = jwtVerify === 'expired' ? this.serverError.sendExpiredToken : this.serverError.sendBadToken
                        errorFunction(response)
                    }
                    else {
                        let jwtAccount = {
                            username: jwtVerify.username,
                            password: jwtVerify.password
                        }
                        let dataBaseAcount = {
                            username: account.username,
                            password: account.password
                        }
                        
                        if (!equal(jwtAccount, dataBaseAcount)) {
                            this.serverError.sendBadToken(response)
                        }
                        else {
                            next()
                        }
                    }
                }
            }
            else {
                this.serverError.sendUnAuthorizedAccess(response)
            }
           
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            let newUser: User =
                new UserBuilder()
                    .setEmail(request.body.email)
                    .setUsername(request.body.username)
                    .setPassword(request.body.password)
                    .setType(request.body.type)
                    .build()

            addUser(newUser).then(() => {
                try {
                    generateCookie(response, { username: newUser.username, password: newUser.password })
                    response.status(200).send('ok')
                }
                catch (error) {
                    console.error('error signing: ', error)
                    this.serverError.sendInternalError(response)
                }
            }).catch((error: MongoServerError) => {
                this.dataBaseError.handleError(error, response)
            })
        }
        catch (error: TypeError | any) {
            if (error instanceof TypeError) {
                this.serverError.sendNullBody(response)
            }
            else {
                console.log(error)
                this.serverError.sendInternalError(response)
            }
        }
    }

    login(request: Request, response: Response, next: NextFunction){
        try {
            let loginUser: LoginUser = new LoginUserBuilder()
                .setUsername(request.body.username)
                .setPassword(request.body.password)
                .build();
            console.table(loginUser)
            login(loginUser).then((status: boolean) => {
                if (status) {
                    generateCookie(response, loginUser)
                    response.status(200).send('ok')
                }
                else {
                    this.serverError.sendBadLogin(response)
                }
            }).catch(error => {
                console.error(error)
            })
        }
        catch (error) {
            if (error instanceof TypeError) {
                this.serverError.sendNullBody(response)
            }
            else {
                console.log(error)
                this.serverError.sendInternalError(response)
            }
        }
    }

    logout(request: Request, response: Response, next: NextFunction){
        response.clearCookie('auth');
        response.sendStatus(200);
    }

    build(){
        this.app.use((...args) => this.authenticationMiddleWear(...args))
        this.app.post('/register', (...args) => this.register(...args))
        this.app.post('/login',  (...args) => this.login(...args))
        this.app.post('/logout',  (...args) => this.logout(...args))
    }
}