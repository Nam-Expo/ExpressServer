import { User } from "../types";
import { notNull } from './Validations'


export class UserBuilder {
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;  

    constructor(){
        this.email = undefined
        this.username = undefined
        this.password = undefined
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

    build(): User{
        let user: User = {
            email: this.email as string,
            username: this.username as string,
            password: this.password as string
        }
        
        notNull(user)
        
        return user
    }
}