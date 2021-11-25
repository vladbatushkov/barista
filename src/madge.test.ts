import path from 'path';
import { ExecOptions, ExecException, ChildProcess } from 'child_process';
import ms, { EntryModel } from './madge';

const mockExec = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.spyOn(global.console, 'log').mockImplementation((_) => { });

jest.mock('child_process', () => ({
    exec(command: string, _: {
        encoding: BufferEncoding;
    } & ExecOptions, callback?: (error: ExecException, stdout: string, stderr: string) => void): ChildProcess {
        mockExec(command);
        return callback(null, null, null) as unknown as ChildProcess;
    }
}));

describe('test madge function', () => {
    it('should call exec', async () => {
        const pathIn = path.join('src', 'folder', 'entry.ts');
        const pathOut = path.join('destFolder', 'folder.entry.txt');
        await ms.madge({ fileIn: pathIn, fileOut: pathOut, key: 'folder' } as EntryModel);
        expect(mockExec.mock.calls[0][0]).toBe(`madge ${pathIn} > ${pathOut}`);
    });
});

describe('test createEntryModel function', () => {
    it('should return expected first filename', () => {
        const pathIn = path.join('src', 'first.entry.ts');
        const result = ms.createEntryModel(pathIn, ['dest']);

        expect(result.fileIn).toBe(pathIn);
        const fileOut = path.join('dest', 'src.first.entry.dds');
        expect(result.fileOut).toBe(fileOut);
        expect(result.key).toBe('src');
    });
    it('should return expected second filename', () => {
        const pathIn = path.join('src', 'page', 'second.entry.dds');
        const result = ms.createEntryModel(pathIn, ['dest']);
        expect(result.fileIn).toBe(pathIn);
        const fileOut = path.join('dest', 'page.second.entry.dds');
        expect(result.fileOut).toBe(fileOut);
        expect(result.key).toBe('page');
    });
});
