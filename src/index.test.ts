import { BaristaConfig, ScanConfig, MadgeConfig } from './configProvider';
import main from './index';

const mockBaristaConfig: BaristaConfig = {
    neo4j: {
        host: 'heo4j://localhost:7687',
        login: 'neo4j',
        password: 'test',
        database: 'neo4j'
    },
    scan: {
        src: ['path'],
        regex: ['*']
    },
    madge: {
        dest: ['destFolder']
    }
};

jest.mock('./configProvider', () => ({
    getConfig() {
        return mockBaristaConfig;
    }
}));

jest.mock('./fs', () => ({
    scan(scfg: ScanConfig, cb: (files: string[]) => void): void {
        return cb(['path1', 'path2', 'path3']);
    }
}));

jest.mock('./madge', () => ({
    madge(mcfg: MadgeConfig, entry: string, cb: (file: string) => void): void {
        return cb(entry);
    }
}));

describe('test main', () => {
    it('should log config src', () => {
        jest.spyOn(console, 'log').mockImplementation();
        main();
        expect(console.log).toHaveBeenCalledWith('madge complete path1');
        expect(console.log).toHaveBeenCalledWith('madge complete path2');
        expect(console.log).toHaveBeenCalledWith('madge complete path3');
        expect(console.log).toBeCalledTimes(3);
    });
});
