import configProviderObject from './barista.config.json';

export interface Neo4jConfig {
    host: string;
    login: string;
    password: string;
    database: string;
}

export interface MadgeConfig {
    dest: string[];
}

export interface ScanConfig {
    src: string[];
    regex: string[];
}

export interface BaristaConfig {
    neo4j: Neo4jConfig;
    madge: MadgeConfig;
    scan: ScanConfig;
}

const getConfig = (): BaristaConfig => configProviderObject;

export { getConfig };
