import {
    driver, auth, session, Driver
} from 'neo4j-driver';
import { Neo4jConfig } from './configProvider';

interface INeo4jProvider {
    batch(): void;
    close(): void;
}

class Neo4jProvider implements INeo4jProvider {
    private readonly config: Neo4jConfig;

    private readonly driver: Driver;

    constructor(neocfg: Neo4jConfig) {
        this.config = neocfg;
        this.driver = driver(
            neocfg.host,
            auth.basic(neocfg.login, neocfg.password)
        );
    }

    batch(): void {
        const dbSession = this.driver.session({
            database: this.config.database,
            defaultAccessMode: session.WRITE
        });

        const readTxResultPromise = dbSession.readTransaction((txc) => {
            const result = txc.run('CMD');
            return result;
        });

        readTxResultPromise
            .then((result) => {
                console.log(result.records);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => dbSession.close());
    }

    close(): void {
        this.driver.close();
    }
}

export default { Neo4jProvider };
