import { getConfig } from './configProvider';

jest.mock('./barista.config.json', () => (
    {
        scan: {
            src: './path',
            regex: '*'
        },
        madge: {
            exclude: '**',
            dest: './destFolder'
        }
    }
));

describe('test get function', () => {
    it('scan.src should return ./path', () => {
        expect(getConfig().scan.src).toBe('./path');
    });
    it('scan.regex should return *', () => {
        expect(getConfig().scan.regex).toBe('*');
    });
    it('madge.exclude should return **', () => {
        expect(getConfig().madge.exclude).toBe('**');
    });
    it('madge.dest should return ./destFolder', () => {
        expect(getConfig().madge.dest).toBe('./destFolder');
    });
});
