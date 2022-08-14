
export const notNull = (value: any) => {
    if(typeof value === 'object'){
        for(const property in value){
            if(property === null || property === undefined){
                console.error(new TypeError('null property: '+ property))
                throw new TypeError('null property: '+ property)
            }
        }
    }
    else{
        if(value === null || value === undefined){
            console.error(new TypeError('null property: '+ value))
            throw new TypeError('null property: '+ value)
        }
    }
   
    return true
}