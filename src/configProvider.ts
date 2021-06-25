import configProviderObject from './barista.config.json';

export interface BaristaConfig {
    src: string
}

const get = (): BaristaConfig => configProviderObject;

export default { get };
