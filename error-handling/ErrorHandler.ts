import { Logger } from "./Logger"

export class ErrorHandler {
    logger: Logger

    constructor(logger: Logger){
        this.logger = logger
    }
}