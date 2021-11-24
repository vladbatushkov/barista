import G from 'glob';
import path from 'path';
import { PathLike } from 'fs';
import fs from './fs';
import { EntryModel } from './madge';

const mockGlob = jest.fn((pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void) => {
    cb(null, ['path1', 'path2']);
});

jest.mock('glob', () => ({
    glob(pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void): G.IGlob {
        return mockGlob(pattern, options, cb) as unknown as G.IGlob;
    }
}));

jest.mock('fs', () => ({
    readFileSync(_1: PathLike | number,
        _2: { encoding: BufferEncoding; flag?: string; } | BufferEncoding): string {
        return '\n\nProcessed\nfile1\n,folder2/file2\n  ../folder3/file3\n,../../folder4/file4\nfile5';
    }
}));

describe('test scan function', () => {
    it('verify scan function', async () => {
        const files = await fs.scan(['path'], '*');
        expect(files[0]).toBe('path1');
        expect(files[1]).toBe('path2');
        expect(mockGlob.mock.calls[0][0]).toBe(path.join('path', '*'));
    });
});

describe('test transform function', () => {
    it('verify transform function', () => {
        const obj1 = { key: 'src', fileIn: 'any', fileOut: 'mock' } as EntryModel;
        const obj2 = { key: 'b', fileIn: 'any', fileOut: 'mock' } as EntryModel;
        const list = [obj1, obj2];
        const files = fs.transform(list);
        expect(files.file1.length).toBe(4);
        expect(files.file1[0]).toBe('file1');
        expect(files.file1[1]).toBe(',folder2/file2');
        expect(files.file1[2]).toBe(',folder3/file3');
        expect(files.file1[3]).toBe(',folder4/file4');
        expect(files.file5.length).toBe(1);
        expect(files.file5[0]).toBe('file5');
        expect(files['b/file1'].length).toBe(4);
        expect(files['b/file1'][0]).toBe('b/file1');
        expect(files['b/file1'][1]).toBe(',b/folder2/file2');
        expect(files['b/file1'][2]).toBe(',folder3/file3');
        expect(files['b/file1'][3]).toBe(',folder4/file4');
        expect(files['b/file5'].length).toBe(1);
        expect(files['b/file5'][0]).toBe('b/file5');
    });
});
