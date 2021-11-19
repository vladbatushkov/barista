import { FileDepOnFile, FolderInFolder, FileFromFolder } from './triples.d';

// (thisFile:File)-[:DEPENDS_ON]->(thatFile:File)
const cmdDependsOn = (x: FileDepOnFile): string => `MERGE (a:File { name: "${x.thisFile}" }) ON CREATE SET a.name = "${x.thisFile}" MERGE (b:File { name: "${x.thatFile}" }) ON CREATE SET b.name = "${x.thatFile}" MERGE (a)-[:DEPENDS_ON]->(b);`;

// (thisFodler:Folder)-[:IN]->(thatFolder:Folder)
const cmdIn = (x: FolderInFolder): string => `MERGE (a:Folder { name: "${x.thisFolder}" }) ON CREATE SET a.name = "${x.thisFolder}" MERGE (b:Folder { name: "${x.thatFolder}" }) ON CREATE SET b.name = "${x.thatFolder}" MERGE (a)-[:IN]->(b);`;

// (thisFile:File)-[:FROM]->(thatFolder:Folder)
const cmdFrom = (x: FileFromFolder): string => `MERGE (a:File { name: "${x.thisFile}" }) ON CREATE SET a.name = "${x.thisFile}" MERGE (b:Folder { name: "${x.thatFolder}" }) ON CREATE SET b.name = "${x.thatFolder}" MERGE (a)-[:FROM]->(b);`;

const mutate = (initFile: string, line: string): Record<string, string[]> => {
    const result = [];
    let thisFile = initFile;
    const arr = line.split(',');
    if (arr.length === 1) {
        [thisFile] = arr;
        const chunks = thisFile.indexOf('/') > -1 ? thisFile.split('/') : thisFile.split('\\');
        let i = 1;
        let thatFolder = '';
        while (i < chunks.length - 1) {
            const thisFolder = chunks.slice(0, i + 1).join('/');
            thatFolder = chunks.slice(0, i).join('/');
            result.push(cmdIn({ thisFolder, thatFolder }));
            i += 1;
        }
        thatFolder = chunks.slice(0, chunks.length - 1).join('/');
        thatFolder = thatFolder === '' ? 'root' : thatFolder;
        result.push(cmdFrom({ thisFile, thatFolder }));
        return { arr: result, next: [thisFile] };
    }
    const thatFile = arr[1];
    result.push(cmdDependsOn({ thisFile, thatFile }));
    return { arr: result, next: [thisFile] };
};

const build = (obj: Record<string, string[]>): string[] => {
    let thisFile = '';
    return Object.keys(obj).map((keyObj) => {
        const items = obj[keyObj];
        return items.map((x) => {
            const result = mutate(thisFile, x);
            [thisFile] = result.next;
            return result.arr;
        }).reduce((acc, a) => { a.forEach(x => acc.push(x)); return acc; }, []);
    }).reduce((acc, a) => { a.forEach(x => acc.push(x)); return acc; }, []);
};

export default {
    cmdDependsOn, cmdIn, cmdFrom, build
};
