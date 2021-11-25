module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    testRegex: '.test\\.ts$',
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 96,
            lines: 84,
            statements: 86
        }
    },
    coverageReporters: [['text', { skipFull: true }]],
    coveragePathIgnorePatterns: ['neo4j.ts']
};
