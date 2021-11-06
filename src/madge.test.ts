import path from 'path';
import { ExecOptions, ExecException, ChildProcess } from 'child_process';
import { MadgeConfig } from './configProvider';
import ms from './madge';

const mockExec = jest.fn();

jest.mock('child_process', () => ({
    exec(command: string, _: {
        encoding: BufferEncoding;
    } & ExecOptions, callback?: (error: ExecException, stdout: string, stderr: string) => void): ChildProcess {
        mockExec(command);
        return callback(null, null, null) as unknown as ChildProcess;
    }
}));

describe('test madge function', () => {
    it('should execute callback', () => {
        const mcfg: MadgeConfig = {
            dest: ['./destFolder/']
        };
        const mockCallback = jest.fn();
        const pathIn = path.join('src', 'folder', 'entry.ts');
        const pathOut = path.join('destFolder', 'folder.entry.txt');
        ms.madge(mcfg, pathIn, mockCallback);
        expect(mockExec.mock.calls[0][0]).toBe(`madge ${pathIn} > ${pathOut}`);
        expect(mockCallback.mock.calls).toHaveLength(1);
    });
});

describe('test getFile function', () => {
    it('should return expected first filename', () => {
        const result = ms.getFile(path.join('src', 'first.entry.ts'));
        expect(result).toBe('src.first.entry.txt');
    });
    it('should return expected second filename', () => {
        const result = ms.getFile(path.join('src', 'page', 'second.entry.ts'));
        expect(result).toBe('page.second.entry.txt');
    });
});
