import configProviderObject from './barista.config.json';

export interface GraphConfig {
    host: string;
    login: string;
    password: string;
    database: string;
}

export interface ScanConfig {
    regex: string;
    source: string[];
    dest: string[];
}

export interface BaristaConfig {
    graph: GraphConfig;
    scan: ScanConfig;
}

const getConfig = (): BaristaConfig => configProviderObject;

export { getConfig };
