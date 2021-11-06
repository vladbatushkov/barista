import { BaristaConfig, ScanConfig, MadgeConfig } from './configProvider';
import main from './index';

const mockBaristaConfig: BaristaConfig = {
    graph: {
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
        dest: ['destFolder'],
        select: '*'
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
    it('should call log', () => {
        jest.spyOn(console, 'log').mockImplementation();
        main();
        expect(console.log).toBeCalled();
    });
});
