import path from 'path';
import { exec, ExecException } from 'child_process';
import { MadgeConfig } from './configProvider';

const getFile = (entry: string): Record<string, string> => {
    const dir = path.basename(path.dirname(entry));
    const name = path.basename(entry).replace(path.extname(entry), '');
    return {
        key: dir,
        file: `${dir}.${name}.txt`
    };
};

const madge = (mcfg: MadgeConfig, entry: string): Promise<Record<string, string>> =>
    new Promise<Record<string, string>>(
        (resolve, reject) => {
            const obj = getFile(entry);
            const dest = path.join(...mcfg.dest, obj.file);
            obj.dest = dest;
            exec(
                `madge ${entry} > ${dest}`,
                { encoding: 'utf-8' },
                (error: ExecException) => {
                    if (error) {
                        reject(error);
                    }
                    console.log(`Madge completed with output file: ${dest}`);
                    resolve(obj);
                }
            );
        }
    );

export default { madge, getFile };
