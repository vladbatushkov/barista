import configProviderObject from './barista.config.json';

export interface ScanConfig {
    src: string;
    regex: string;
}

export interface MadgeConfig {
    exclude: string;
    dest: string;
}

export interface BaristaConfig {
    scan: ScanConfig;
    madge: MadgeConfig;
}

const getConfig = (): BaristaConfig => configProviderObject;

export { getConfig };
