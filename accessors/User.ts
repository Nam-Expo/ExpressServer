import { Auth, LoginUser, User, AccountType } from "../types";
import { notNull } from './Validations'
import { getHash } from "../authentication/crypto";

export class UserBuilder {
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;  
    type: AccountType | undefined

    constructor(){
        this.email = undefined
        this.username = undefined
        this.password = undefined
        this.type = undefined
    }

    setEmail(email: string){
        this.email = email
        return this
    }

    setUsername(username: string){
        this.username = username
        return this
    }

    setPassword(password: string){
        this.password = password
        return this
    }

    setType(type: AccountType){
        const types = ["user", "server", "company"]
        let check = false
        
        types.forEach(typer => {
            if(type === typer){
                console.log('is right')
                check = true
            }
        })

        if(check){
            this.type = type
            return this
        }
        else {
            throw new TypeError()
        }
    }

    build(): User{
        let user: User = {
            email: this.email as string,
            username: this.username as string,
            password: this.password as string,
            type: this.type as AccountType
        }
        
        notNull(user)
    
        return {
            ...user,
            password: getHash(user.password)
        } 
    }
}

export class LoginUserBuilder {
    username: string | undefined;
    password: string | undefined;  

    constructor(){
        this.username = undefined
        this.password = undefined
    }

    setUsername(username: string){
        this.username = username
        return this
    }

    setPassword(password: string){
        this.password = password
        return this
    }

    build(): LoginUser{
        let user: LoginUser = {
            username: this.username as string,
            password: this.password as string
        }
        
        notNull(user)
    
        return {
            ...user,
            password: getHash(user.password)
        } 
    }
}

export class AuthBuilder {
    username: string | undefined;
    password: string | undefined;  
    token: string | undefined;  

    constructor(){
        this.username = undefined
        this.password = undefined
        this.token = undefined
    }

    setUsername(username: string){
        this.username = username
        return this
    }

    setToken(token: string){
        this.token = token
        return this
    }

    build(): Auth{
        let user: Auth = {
            username: this.username as string,
            token: this.token as string
        }
        
        notNull(user)
    
        return user
    }
}