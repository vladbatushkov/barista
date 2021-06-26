import configProvider from './configProvider';

const main = () => {
    try {
        const config = configProvider.get();
        console.log(`src: '${config.src}'`);
    } catch (err) {
        console.error(err);
    }
    return 'Hasta la vista, Barista';
};

export default main;
