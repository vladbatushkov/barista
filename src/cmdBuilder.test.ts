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

describe('test build', () => {
    it('verify correct list', () => {
        const cmds = [
            'MERGE (a:File { name: "0" }) ON CREATE SET a.name = "0" MERGE (b:Folder { name: "root" }) ON CREATE SET b.name = "root" MERGE (a)-[:FROM]->(b);',
            'MERGE (a:Folder { name: "a/b" }) ON CREATE SET a.name = "a/b" MERGE (b:Folder { name: "a" }) ON CREATE SET b.name = "a" MERGE (a)-[:IN]->(b);',
            'MERGE (a:Folder { name: "a/b/c" }) ON CREATE SET a.name = "a/b/c" MERGE (b:Folder { name: "a/b" }) ON CREATE SET b.name = "a/b" MERGE (a)-[:IN]->(b);',
            'MERGE (a:File { name: "a/b/c/1" }) ON CREATE SET a.name = "a/b/c/1" MERGE (b:Folder { name: "a/b/c" }) ON CREATE SET b.name = "a/b/c" MERGE (a)-[:FROM]->(b);',
            'MERGE (a:File { name: "d/2" }) ON CREATE SET a.name = "d/2" MERGE (b:Folder { name: "d" }) ON CREATE SET b.name = "d" MERGE (a)-[:FROM]->(b);',
            'MERGE (a:File { name: "d/2" }) ON CREATE SET a.name = "d/2" MERGE (b:File { name: "/e/3" }) ON CREATE SET b.name = "/e/3" MERGE (a)-[:DEPENDS_ON]->(b);',
            'MERGE (a:File { name: "d/2" }) ON CREATE SET a.name = "d/2" MERGE (b:File { name: "/e/f/4" }) ON CREATE SET b.name = "/e/f/4" MERGE (a)-[:DEPENDS_ON]->(b);'
        ];
        const obj = { item: ['0', 'a/b/c/1', 'd/2', ',/e/3', ',/e/f/4'] } as Record<string, string[]>;
        const res = cmdBuilder.build(obj);
        expect(res.length).toBe(7);
        expect(res[0]).toBe(cmds[0]);
        expect(res[1]).toBe(cmds[1]);
        expect(res[2]).toBe(cmds[2]);
        expect(res[3]).toBe(cmds[3]);
        expect(res[4]).toBe(cmds[4]);
        expect(res[5]).toBe(cmds[5]);
        expect(res[6]).toBe(cmds[6]);
    });
});
