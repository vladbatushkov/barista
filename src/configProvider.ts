import configProviderObject from './barista.config.json';

export interface ScanConfig {
    src: string,
    regex: string
}

export interface BaristaConfig {
    scan: ScanConfig
}

const get = (): BaristaConfig => configProviderObject;

export default { get };
