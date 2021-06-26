import configProvider from './configProvider';

jest.mock('./barista.config.json', () => (
    {
        src: 'path'
    }
));

describe('test get function', () => {
    it('should return path', () => {
        expect(configProvider.get().src).toBe('path');
    });
});
