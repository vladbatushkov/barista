import {
    driver, auth, session, Driver
} from 'neo4j-driver';
import { GraphConfig } from './configProvider';

interface INeo4jProvider {
    batch(cmds: string[]): Promise<void>;
    clearDb(): Promise<void>;
    close(): Promise<void>;
}

class Neo4jProvider implements INeo4jProvider {
    private readonly config: GraphConfig;

    private readonly driver: Driver;

    constructor(gcfg: GraphConfig) {
        this.config = gcfg;
        this.driver = driver(
            gcfg.host,
            auth.basic(gcfg.login, gcfg.password)
        );
    }

    async batch(cmds: string[]): Promise<void> {
        const dbSession = this.driver.session({
            database: this.config.database,
            defaultAccessMode: session.WRITE
        });

        const readTxResultPromise = dbSession.writeTransaction((txc) => {
            const results = [];
            cmds.forEach((cmd) => {
                results.push(txc.run(cmd));
            });

            return results;
        });

        return readTxResultPromise
            .then()
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .then(() => dbSession.close());
    }

    async clearDb(): Promise<void> {
        const dbSession = this.driver.session({
            database: this.config.database,
            defaultAccessMode: session.WRITE
        });

        return dbSession
            .run('MATCH (n) DETACH DELETE n')
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .then(() => dbSession.close());
    }

    async close(): Promise<void> {
        return this.driver.close();
    }
}

export default { Neo4jProvider };
