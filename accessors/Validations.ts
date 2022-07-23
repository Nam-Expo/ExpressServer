
export const notNull = (object: any) => {
    console.log(object)
    for(const property in object){
        console.log(property)
        if(property === null || property === undefined){
            console.error(new TypeError('null property: '+ property))
            throw new TypeError('null property: '+ property)
        }
    }
    return true
}