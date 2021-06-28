import configProvider from './configProvider';

jest.mock('./barista.config.json', () => (
    {
        scan: {
            src: 'path',
            regex: "*"
        }
    }
));

describe('test get function', () => {
    it('src should return path', () => {
        expect(configProvider.get().scan.src).toBe('path');
    });
    it('regex should return *', () => {
        expect(configProvider.get().scan.regex).toBe('*');
    });
});
