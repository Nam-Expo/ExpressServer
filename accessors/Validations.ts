
export const notNull = (object: any) => {
    for(const property in object){
        if(property === null || property === undefined){
            console.error(new TypeError('null property: '+ property))
            throw new TypeError('null property: '+ property)
        }
    }
    return true
}