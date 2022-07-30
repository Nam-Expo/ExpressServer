import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { LoginUser, Auth, JWTVerified } from '../types';

export const sign = (user: LoginUser) => {
    return jwt.sign(user, user.password, 
        { expiresIn: "9h" } 
    )
}

export const verify = (user: LoginUser, token: string): JWTVerified | 'expired' | 'bad' => {
    try {
        var decoded = jwt.verify(token, user.password);
        return decoded as JWTVerified
    } 
    catch(err: JsonWebTokenError | any) {
        let error = err as JsonWebTokenError
        
        if(error.name === 'TokenExpiredError'){
            return 'expired'
        }
        if(error.name === 'JsonWebTokenError'){
            return 'bad'
        }
        else{
            return 'bad'
        }
    }
}