import { getConfig } from './configProvider';

jest.mock('./barista.config.json', () => (
    {
        neo4j: {
            host: 'neo4j://localhost:7687',
            login: 'user',
            password: 'test',
            database: 'db'
        },
        madge: {
            exclude: '**',
            dest: ['.', 'destFolder']
        },
        scan: {
            src: ['.', 'path'],
            regex: ['*']
        }
    }
));

describe('test get function', () => {
    it('neo4j.host should return neo4j://localhost:7687', () => {
        expect(getConfig().neo4j.host).toBe('neo4j://localhost:7687');
    });
    it('neo4j.login should return user', () => {
        expect(getConfig().neo4j.login).toBe('user');
    });
    it('neo4j.password should return test', () => {
        expect(getConfig().neo4j.password).toBe('test');
    });
    it('neo4j.database should return db', () => {
        expect(getConfig().neo4j.database).toBe('db');
    });
    it('madge.dest should return ./destFolder', () => {
        expect(getConfig().madge.dest).toStrictEqual(['.', 'destFolder']);
    });
    it('scan.src should return ./path', () => {
        expect(getConfig().scan.src).toStrictEqual(['.', 'path']);
    });
    it('scan.regex should return *', () => {
        expect(getConfig().scan.regex).toStrictEqual(['*']);
    });
});
