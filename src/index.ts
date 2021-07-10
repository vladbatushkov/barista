import { getConfig, MadgeConfig } from './configProvider';
import fs from './fs';
import ms from './madge';

const madgeCalback = (file: string) => {
    console.log(`madge complete ${file}`);
};

const scanCallback = (mcfg: MadgeConfig, entries: string[]): void => {
    entries.forEach((entry) => {
        ms.madge(mcfg, entry, madgeCalback);
    });
};

const main = () => {
    try {
        const config = getConfig();
        fs.scan(config.scan, es => scanCallback(config.madge, es));
    } catch (err) {
        console.error(err);
    }
    return 'Barista brewing...';
};

export default main;
