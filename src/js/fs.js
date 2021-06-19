const fs = require('fs');
const path = require('path');
const readline = require('readline')

const scan = (filter, dir, done) => {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    scan(filter, file, function (err, res) {
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
    fs.readFileSync(path, 'utf-8').split(/\r?\n/).forEach(function (line) {
        callback(line);
    });
};

const write = (path, content) => {
    fs.writeFile(path, content, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
};

module.exports = { scan, read, write };