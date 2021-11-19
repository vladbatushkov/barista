import path from 'path';
import { exec, ExecException } from 'child_process';

export type EntryModel = {
    key: string;
    fileIn: string;
    fileOut: string;
}

const createEntryModel = (pathIn: string, pathOut: string[]): EntryModel => {
    const key = path.basename(path.dirname(pathIn));
    const name = path.basename(pathIn).replace(path.extname(pathIn), '');
    const fullname = `${key}.${name}.dds`;
    const fileOut = path.join(...pathOut, fullname);
    return {
        key,
        fileIn: pathIn,
        fileOut
    } as EntryModel;
};

const madge = (obj: EntryModel): Promise<void> =>
    new Promise<void>(
        (resolve, reject) => {
            exec(
                `madge ${obj.fileIn} > ${obj.fileOut}`,
                { encoding: 'utf-8' },
                (error: ExecException) => {
                    if (error) {
                        reject(error);
                    }
                    console.log(`Madge completed with output file: ${obj.fileOut}`);
                    resolve();
                }
            );
        }
    );

export default { madge, createEntryModel };
