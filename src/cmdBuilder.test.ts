import cmdBuilder from './cmdBuilder';

describe('test cmdBuilder', () => {
    it('verify CMD for cmdDependsOn', () => {
        expect(cmdBuilder.cmdDependsOn({ thisFile: 'file1', thatFile: 'file2' })).toBe('MERGE (a:File { name: "file1" }) ON CREATE SET a.name = "file1" MERGE (b:File { name: "file2" }) ON CREATE SET b.name = "file2" MERGE (a)-[:DEPENDS_ON]->(b);');
    });
    it('verify CMD for cmdFrom', () => {
        expect(cmdBuilder.cmdFrom({ thisFile: 'file1', thatFolder: 'folder1' })).toBe('MERGE (a:File { name: "file1" }) ON CREATE SET a.name = "file1" MERGE (b:Folder { name: "folder1" }) ON CREATE SET b.name = "folder1" MERGE (a)-[:FROM]->(b);');
    });
    it('verify CMD for cmdIn', () => {
        expect(cmdBuilder.cmdIn({ thisFolder: 'folder1', thatFolder: 'folder2' })).toBe('MERGE (a:Folder { name: "folder1" }) ON CREATE SET a.name = "folder1" MERGE (b:Folder { name: "folder2" }) ON CREATE SET b.name = "folder2" MERGE (a)-[:IN]->(b);');
    });
});
