import cmdBuilder from './cmdBuilder';
import {
    getConfig
} from './configProvider';
import fs from './fs';
import ms from './madge';
import ns from './neo4j';

const main = async () => {
    try {
        console.log('Barista start brewing...');

        console.log('Step 1: Read config...');
        const config = getConfig();
        console.log('Config is OK.');

        console.log('Step 2: Scan entires...');
        const entries = await fs.scan(config.scan);
        entries.forEach((x: string) => console.log(x));

        console.log('Step 3: Madge process...');
        const madgePerFilePromises = entries.map(
            (entry: string): Promise<Record<string, string>> => ms.madge(config.madge, entry)
        );
        const objs = await Promise.all(madgePerFilePromises);

        console.log('Step 4: Merge madge results into graph data source...');
        const ds = fs.merge(objs, config.madge);
        console.log(`DataSource created with ${Object.keys(ds).length} keys.`);
        // console.log(ds);

        console.log(`Step 5: Clean up database '${config.graph.database}'...`);
        const neo4jProvider = new ns.Neo4jProvider(config.graph);
        await neo4jProvider.clearDb();

        console.log('Step 6: Creation of a graph...');
        const cmds = cmdBuilder.build(ds);
        await neo4jProvider.batch(cmds);
        console.log(`Graph created with ${cmds.length} nodes.`);

        console.log('Enjoy your graph.');
    } catch (err) {
        console.log(`Global error handler: ${err}`);
    }
};

export default main;
