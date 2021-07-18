import path from 'path';
import { exec, ExecException } from 'child_process';
import { MadgeConfig } from './configProvider';

const getFile = (entry: string): string => {
    const chunks = entry.split(path.sep).reverse();
    const key = chunks[1] ?? '';
    return `${key}.${chunks[0].replace('.ts', '').replace('.d', '')}.txt`;
};

const madge = (mcfg: MadgeConfig, entry: string, cb: (file: string) => void): void => {
    const file = getFile(entry);
    const dest = path.join(mcfg.dest, file);
    const excl = mcfg.exclude ? ` --exclude '${mcfg.exclude}'` : '';
    exec(
        `madge${excl} ${entry} > ${dest}`,
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
