import { BaristaConfig } from './configProvider';
import main from './index';

const mockBaristaConfig: BaristaConfig = {
    graph: {
        host: 'heo4j://localhost:7687',
        login: 'neo4j',
        password: 'test',
        database: 'neo4j'
    },
    scan: {
        regex: '*',
        source: ['path'],
        dest: ['destFolder']
    }
};

jest.mock('./configProvider', () => ({
    getConfig() {
        return mockBaristaConfig;
    }
}));

jest.mock('./fs', () => ({
    scan(_1: string[], _2: string): Promise<string[]> {
        return Promise.resolve(['path1', 'path2', 'path3']);
    }
}));

jest.mock('./madge', () => ({
}));

describe('test main', () => {
    it('should call log', () => {
        jest.spyOn(console, 'log').mockImplementation();
        main();
        expect(console.log).toBeCalled();
    });
});
