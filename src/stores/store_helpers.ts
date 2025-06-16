import { get } from 'svelte/store';
import { configStore } from '$stores/stores_config';
import type { Config } from '$lib/config';
import { isLocalhost, selectedCurrency, sessionStore, type BigMarketSessionStore } from './stores';
import type { DaoConfig } from '$lib/config_dao';
import { configDaoStore } from './stores_config_dao';

export function getDaoConfig(): DaoConfig {
	return get(configDaoStore);
}

export function getConfig(): Config {
	return get(configStore);
}

export function getIsLocalhost(): boolean {
	return get(isLocalhost);
}

export function getSession(): BigMarketSessionStore {
	return get(sessionStore);
}

export type Currency = {
	code: string;
	name: string;
	flag: string;
	symbol: string;
};
export function getSelectedCurrency(): Currency {
	return get(selectedCurrency);
}
