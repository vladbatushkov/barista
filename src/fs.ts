import { glob } from 'glob';
import path from 'path';
import { ScanConfig } from './configProvider';

const scan = (scfg: ScanConfig, cb: (files: string[]) => void): void => {
    const pattern = path.join(...[...scfg.src, ...scfg.regex]);
    glob(pattern, {}, (err, files) => {
        if (err) {
            throw err;
        }
        cb(files);
    });
};

export default { scan };
