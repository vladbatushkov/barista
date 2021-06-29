import configProvider from './configProvider';
import fs from './fs';

const processScan = (files: string[]): void => {
    console.log(files);
};

const main = () => {
    try {
        const config = configProvider.get();
        fs.scan(config.scan, processScan);
    } catch (err) {
        console.error(err);
    }
    return 'Hasta la vista, Barista';
};

export default main;
