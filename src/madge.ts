import path from 'path';
import { exec, ExecException } from 'child_process';
import { MadgeConfig } from './configProvider';

const getFile = (entry: string): string => {
    const dir = path.basename(path.dirname(entry));
    const name = path.basename(entry).replace(path.extname(entry), '');
    return `${dir}.${name}.txt`;
};

const madge = (mcfg: MadgeConfig, entry: string, cb: (file: string) => void): void => {
    const file = getFile(entry);
    const dest = path.join(...mcfg.dest, file);
    exec(
        `madge ${entry} > ${dest}`,
        { encoding: 'utf-8' },
        (error: ExecException) => {
            if (error) {
                throw error;
            }
            cb(dest);
        }
    );
};

export default { madge, getFile };
