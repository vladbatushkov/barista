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
            exclude: '***',
            dest: './destFolder/'
        };
        const mockCallback = jest.fn();
        ms.madge(mcfg, path.join('src', 'folder', 'entry.ts'), mockCallback);
        expect(mockExec.mock.calls[0][0]).toBe('madge --exclude \'***\' src/folder/entry.ts > destFolder/folder.entry.txt');
        expect(mockCallback.mock.calls).toHaveLength(1);
    });
    it('should execute callback without exclude', () => {
        const mcfg: MadgeConfig = {
            exclude: '',
            dest: './destFolder/'
        };
        const mockCallback = jest.fn();
        ms.madge(mcfg, path.join('src', 'folder', 'entry.ts'), mockCallback);
        expect(mockExec.mock.calls[1][0]).toBe('madge src/folder/entry.ts > destFolder/folder.entry.txt');
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
