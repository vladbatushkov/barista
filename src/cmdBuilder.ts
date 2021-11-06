import { FileDepOnFile, FolderInFolder, FileFromFolder } from './triples.d';

// (thisFile:File)-[:DEPENDS_ON]->(thatFile:File)
const cmdDependsOn = (x: FileDepOnFile): string => `MERGE (a:File { name: "${x.thisFile}" }) ON CREATE SET a.name = "${x.thisFile}" MERGE (b:File { name: "${x.thatFile}" }) ON CREATE SET b.name = "${x.thatFile}" MERGE (a)-[:DEPENDS_ON]->(b);`;

// (thisFodler:Folder)-[:IN]->(thatFolder:Folder)
const cmdIn = (x: FolderInFolder): string => `MERGE (a:Folder { name: "${x.thisFolder}" }) ON CREATE SET a.name = "${x.thisFolder}" MERGE (b:Folder { name: "${x.thatFolder}" }) ON CREATE SET b.name = "${x.thatFolder}" MERGE (a)-[:IN]->(b);`;

// (thisFile:File)-[:FROM]->(thatFolder:Folder)
const cmdFrom = (x: FileFromFolder): string => `MERGE (a:File { name: "${x.thisFile}" }) ON CREATE SET a.name = "${x.thisFile}" MERGE (b:Folder { name: "${x.thatFolder}" }) ON CREATE SET b.name = "${x.thatFolder}" MERGE (a)-[:FROM]->(b);`;

export default {
    cmdDependsOn, cmdIn, cmdFrom
};
