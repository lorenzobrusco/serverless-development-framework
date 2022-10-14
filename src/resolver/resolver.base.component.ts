import { LogLevel } from "typescript-logging";
import { Log4TSProvider, Logger } from "typescript-logging-log4ts-style";

/**
 * Base Component class 
 * */
export abstract class BaseComponent {

    private provider: Log4TSProvider;
    protected logger: Logger;

    constructor(name: string) {
        this.provider = Log4TSProvider.createProvider(`${name}Provider`, {
            level: LogLevel.toLogLevel(process.env.LogLevel ?? 'Info') ?? LogLevel.Error,
            groups: [{
                expression: new RegExp(".+"),
            }]
        });
        this.logger = this.provider.getLogger(name);
    }

}