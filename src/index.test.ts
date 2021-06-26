import main from './index';

jest.mock('./configProvider', () => ({
    get() {
        return {
            src: 'path'
        };
    }
}));

describe('test main', () => {
    it('should log config src', () => {
        jest.spyOn(console, 'log').mockImplementation();
        main();
        expect(console.log).toHaveBeenCalledWith('src: \'path\'');
    });
});
