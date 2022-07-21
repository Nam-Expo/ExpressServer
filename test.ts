import 'dotenv/config' 
import { getAccount } from "./db/fetch";


console.log('testing')
getAccount('jeff').then((res) => {
    console.log(res)
})