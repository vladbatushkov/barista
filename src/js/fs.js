const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { encode } = require('./common/utils.js');

const scan = (filter, dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    scan(filter, file, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (filter(file)) results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const read = (path, callback) => {
    fs.readFileSync(path, encode).split(/\r?\n/).forEach((line) => {
        callback(line);
    });
};

const write = (path, content) => {
    fs.writeFile(path, content, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = { scan, read, write };
