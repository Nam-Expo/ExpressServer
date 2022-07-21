import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { User, Auth } from '../types';
import { getHash } from './crypto';

export const sign = (user: User) => {
    return jwt.sign(user.username, 
        getHash(user.password), 
        { expiresIn: '10h' } 
    )
}

export const verify = (auth: Auth, passwordHash: string): string | 'expired' | 'bad' => {
    
    try {
        var decoded = jwt.verify(auth.token, passwordHash);
        return decoded as string
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