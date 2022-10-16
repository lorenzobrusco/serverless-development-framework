import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Metrics } from '@aws-lambda-powertools/metrics';

export abstract class BaseComponent {

    protected logger: Logger;
    protected metrics: Metrics;
    protected tracer: Tracer;

    constructor(name?: string) {
        name = `${name ?? this.constructor.name}`;
        this.logger = new Logger({
            logLevel: process.env.LogLevel ?? 'INFO',
            serviceName: name
        });
        this.tracer = new Tracer({ serviceName: name });
        this.metrics = new Metrics({ namespace: name });
        this.tracer.provider.setLogger(this.logger);
    }

}