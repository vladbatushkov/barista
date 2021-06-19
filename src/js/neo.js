const neo4j = require('neo4j-driver');

function exec(cmds) {
    const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "barista"));
    execNext(cmds, driver);
}

function execNext(cmds, driver) {

    const session = driver.session({
        database: 'neo4j',
        defaultAccessMode: neo4j.session.WRITE
    });

    const cmd = cmds.pop();
    if (cmd == undefined) {
        driver.close();
        return true;
    }

    session.run(cmd.replace('\\', '/'))
        .catch(error => {
            console.log(error);
        })
        .then(() => {
            session.close();
            return execNext(cmds, driver);
        });        
}

// thisFile DEPENDS_ON thatFile
function cmdDependsOn(x) {
    return `MERGE (a:File { name: \"${x.thisFile}\" }) ON CREATE SET a.name = \"${x.thisFile}\" MERGE (b:File { name: \"${x.thatFile}\" }) ON CREATE SET b.name = \"${x.thatFile}\" MERGE (a)-[:DEPENDS_ON]->(b);`;
}

// thisFodler IN thatFolder
function cmdIn(x) {
    return `MERGE (a:Folder { name: \"${x.thisFolder}\" }) ON CREATE SET a.name = \"${x.thisFolder}\" MERGE (b:Folder { name: \"${x.thatFolder}\" }) ON CREATE SET b.name = \"${x.thatFolder}\" MERGE (a)-[:IN]->(b);`;
}

// thisFile FROM thatFolder
function cmdFrom(x) {
    return `MERGE (a:File { name: \"${x.thisFile}\" }) ON CREATE SET a.name = \"${x.thisFile}\" MERGE (b:Folder { name: \"${x.thatFolder}\" }) ON CREATE SET b.name = \"${x.thatFolder}\" MERGE (a)-[:FROM]->(b);`;
}

module.exports = { exec, cmdDependsOn, cmdFrom, cmdIn };
