const { execSync } = require("child_process");
const { scan, read, write } = require("./fs.js");
const { exec, cmdDependsOn, cmdFrom, cmdIn } = require("./neo.js");

const filter = (file) => (file.indexOf('.ts') == (file.length - 3)
    && file.indexOf('entry') > -1);

const callback = (err, entries) => {
    if (err) throw err;

    let sources = {};
    entries = entries.flat();
    console.log("List of entries to analyze:");
    console.log(entries);

    entries.forEach(entry => {
        const chunks = entry.split('\\').reverse();
        const key = chunks[1];
        const file = `${key}.${chunks[0].replace('.ts', '')}.txt`;
        processEntry(sources, key, file, entry);
    });
    //write('./sources.json', JSON.stringify(sources));
    processSource(sources);
};

main = () => {
    console.log("Scan for 'entry' files...");
    scan(filter, "C:\\src\\agoda-front-end\\agoda-com-dictator\\Src\\Agoda.Website\\Agoda.Website.ClientSide\\src", callback);
};

processEntry = (s, key, file, entry) => {
    console.log(`\n\nExecute madge on entry: ${entry}\n`);
    //execSync(`madge --exclude \"^.*(snap|json)\" ${entry} > source/${file}`, { encoding: "utf-8" });
    let root = '';
    let isPush = false;
    read(`./source/${file}`, (x) => {
        if (x.trim() == '' || x.indexOf('Processed') > -1) return;
        x = x.indexOf("  ") > -1 ? x.replace("  ", ',') : x;
        const isRoot = x.indexOf(',') == -1;
        const isInternal = x.indexOf("..") == -1;
        x = key == "src" ? x : (isInternal ? (isRoot ? `${key}/${x}` : `,${key}/${x.replace(',', '')}`) : x);
        x = isInternal ? x : x.replace(/(\.\.\/)/g, '');

        if (isRoot) {
            isPush = false;
        }
        if (isRoot && s[x] == undefined) {
            isPush = true;
            root = x;
            s[root] = [root];
        } else if (isPush) {
            s[root].push(x);
        }
    });
};

processSource = (obj) => {

    console.log('\nDestroying existed data in graph...');
    exec(["MATCH (n) DETACH DELETE n;"]);

    const cmds = Object.keys(obj).map(keyObj => {
        const items = obj[keyObj];
        return items.map(x => mutate(x));
    }).flat().flat();

    console.log('\nBrewing a graph...');
    exec(cmds);
};

let thisFile = '';

mutate = (line) => {
    let result = [];
    const arr = line.split(',');
    if (arr.length == 1) {
        thisFile = arr[0];
        const chunks = thisFile.split('/');
        let i = 1;
        while (i < chunks.length - 1) {
            const thisFolder = chunks.slice(0, i + 1).join('/');
            const thatFolder = chunks.slice(0, i).join('/');
            result.push(cmdIn({ thisFolder, thatFolder }));
            i++;
        }
        const thatFolder = chunks.slice(0, chunks.length - 1).join('/');
        result.push(cmdFrom({ thisFile, thatFolder }));
        return result;
    }
    const thatFile = arr[1];
    result.push(cmdDependsOn({ thisFile, thatFile }));
    return result;
};

main();