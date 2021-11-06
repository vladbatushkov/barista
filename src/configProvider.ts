import configProviderObject from './barista.config.json';

export interface GraphConfig {
    host: string;
    login: string;
    password: string;
    database: string;
}

export interface MadgeConfig {
    dest: string[];
    select: string;
}

export interface ScanConfig {
    src: string[];
    regex: string[];
}

export interface BaristaConfig {
    graph: GraphConfig;
    madge: MadgeConfig;
    scan: ScanConfig;
}

const getConfig = (): BaristaConfig => configProviderObject;

export { getConfig };
