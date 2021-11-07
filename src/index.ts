import cmdBuilder from './cmdBuilder';
import {
    getConfig
} from './configProvider';
import fs from './fs';
import ms from './madge';
import ns from './neo4j';

const main = async () => {
    try {
        console.log('Barista start brewing Client-side Dependency Graph...');

        console.log('Step 1: Read config...');
        const config = getConfig();
        console.log('Config is OK.');

        console.log('Step 2: Scan entity files...');
        const entries = await fs.scan(config.scan.source, config.scan.regex);
        const entryModels = entries.map((entry: string) => {
            console.log(entry);
            return ms.createEntryModel(entry, config.scan.dest);
        });

        console.log('Step 3: Madge process...');
        const madgePromises = entryModels.map(entryObj =>
            ms.madge(entryObj));
        await Promise.all(madgePromises);
        console.log('Madge-based DependencyDataSource files (.dds) are created.');

        console.log('Step 4: Transform DependencyDataSource files (.dds) into the GraphDataSource...');
        const gds = fs.transform(entryModels);
        console.log(`GraphDataSource created with ${Object.keys(gds).length} keys (RAM only).`);
        // console.log(gds);

        console.log(`Step 5: Clean the database '${config.graph.database}'...`);
        const neo4jProvider = new ns.Neo4jProvider(config.graph);
        await neo4jProvider.clearDb();

        console.log('Step 6: Create a Graph...');
        const cmds = cmdBuilder.build(gds);
        await neo4jProvider.batch(cmds);
        console.log(`Graph created using ${cmds.length} triples.`);

        console.log('Enjoy your Client-side Dependency Graph.');
    } catch (err) {
        console.log(`Global error handler: ${err}`);
    }
};

export default main;
