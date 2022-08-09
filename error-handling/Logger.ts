import { Log, RequestLog } from '../accessors/Log'

type LogKey = {
    sourceIP: string, 
    path: string
}

export class Logger {
    logMap = new Map()

    createLog(logKey: LogKey){
        this.logMap.set(JSON.stringify(logKey), undefined)
    }

    setLogProperty(logKey: LogKey, property: keyof RequestLog){
        let log = this.logMap.get(logKey)
        log.property = property
    }

    setLog(logKey: LogKey, log: Log){
        this.logMap.set(JSON.stringify(logKey), log)
    }

    printableLog(logKey: LogKey){
        return this.logMap.get(logKey)
    }
}