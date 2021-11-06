import { getConfig } from './configProvider';

jest.mock('./barista.config.json', () => (
    {
        graph: {
            host: 'neo4j://localhost:7687',
            login: 'user',
            password: 'test',
            database: 'db'
        },
        madge: {
            dest: ['.', 'destFolder'],
            select: '*'
        },
        scan: {
            src: ['.', 'path'],
            regex: ['*']
        }
    }
));

describe('test get function', () => {
    it('graph.host should return neo4j://localhost:7687', () => {
        expect(getConfig().graph.host).toBe('neo4j://localhost:7687');
    });
    it('graph.login should return user', () => {
        expect(getConfig().graph.login).toBe('user');
    });
    it('graph.password should return test', () => {
        expect(getConfig().graph.password).toBe('test');
    });
    it('graph.database should return db', () => {
        expect(getConfig().graph.database).toBe('db');
    });
    it('madge.dest should return ./destFolder', () => {
        expect(getConfig().madge.dest).toStrictEqual(['.', 'destFolder']);
    });
    it('madge.select should return *', () => {
        expect(getConfig().madge.select).toStrictEqual('*');
    });
    it('scan.src should return ./path', () => {
        expect(getConfig().scan.src).toStrictEqual(['.', 'path']);
    });
    it('scan.regex should return *', () => {
        expect(getConfig().scan.regex).toStrictEqual(['*']);
    });
});
