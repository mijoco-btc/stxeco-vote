import { writable } from 'svelte/store';
import { config_dao } from '$lib/config_dao';

const initialConfig = config_dao.mainnet;

export const configDaoStore = writable(initialConfig);

export function switchDaoConfig(env: string) {
	configDaoStore.set(config_dao[env]);
}
export function setConfigByUrl(search: URLSearchParams) {
	const newNetwork = search.get('chain');
	if (newNetwork) {
		switchDaoConfig(newNetwork);
	} else {
		switchDaoConfig('devnet');
	}
}
