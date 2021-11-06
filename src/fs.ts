import { glob } from 'glob';
import path from 'path';
import fs from 'fs';
import { ScanConfig, MadgeConfig } from './configProvider';

const scan = (scfg: ScanConfig): Promise<string[]> => new Promise((resolve, reject) => {
    const pattern = path.join(...[...scfg.src, ...scfg.regex]);
    glob(pattern, {}, (err, files) => {
        if (err) {
            reject(err);
        }
        resolve(files);
    });
});

const mergeFromFile = (result: Record<string, string[]>, obj: Record<string, string>): void => {
    let root = '';
    let isPush = false;
    fs.readFileSync(obj.dest, 'utf-8').split(/\r?\n/).forEach((line) => {
        if (line.trim() === '' || line.indexOf('Processed') > -1) return;
        const x = line.indexOf('  ') > -1 ? line.replace('  ', ',') : line;
        const isRoot = x.indexOf(',') === -1;
        const isInternal = x.indexOf('..') === -1;
        const sub = isRoot ? `${obj.key}/${x}` : `,${obj.key}/${x.replace(',', '')}`;
        const y = isInternal ? sub : x;
        const z = obj.key === 'src' ? x : y;
        const row = isInternal ? z : z.replace(/(\.\.\/)/g, '');

        if (isRoot) {
            isPush = false;
        }
        if (isRoot && result[row] === undefined) {
            isPush = true;
            root = row;
            // eslint-disable-next-line no-param-reassign
            result[root] = [root];
        } else if (isPush) {
            result[root].push(row);
        }
    });
};

const merge = (objs: Record<string, string>[], mcfg: MadgeConfig): Record<string, string[]> => {
    const regex = new RegExp(mcfg.select);
    const result = {} as Record<string, string[]>;
    objs.filter(x => mcfg.select === '' || regex.test(x.dest))
        .forEach((obj) => {
            mergeFromFile(result, obj);
        });
    return { ...result };
};

export default { scan, merge };
