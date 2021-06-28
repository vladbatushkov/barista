import G from 'glob';
import { ScanConfig } from './configProvider';
import fs from './fs';

const mockGlob = jest.fn((pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void) => {
    cb(null, ['path1', 'path2']);
});

jest.mock('glob', () => ({
    glob(pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void): G.IGlob {
        return mockGlob(pattern, options, cb) as unknown as G.IGlob;
    }
}));

describe('test scan function', () => {
    it('should execute callback', () => {
        const scfg: ScanConfig = {
            src: "path",
            regex: "*"
        };
        const mockCallback = jest.fn((files: string[]) => {
            expect(files[0]).toBe('path1');
            expect(files[1]).toBe('path2');
        });
        fs.scan(scfg, mockCallback);
        expect(mockGlob.mock.calls[0][0]).toBe('path*');
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
