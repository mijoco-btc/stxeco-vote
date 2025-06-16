import { writable } from 'svelte/store';
import { config } from '$lib/config';
import { switchDaoConfig } from './stores_config_dao';
import { chain } from './stores';

const initialConfig = config.mainnet;

export let configStore = writable(initialConfig);

export function switchConfig(env: string) {
	switchDaoConfig(env);
	configStore.set(config[env]);
}

function validChain(search: URLSearchParams): boolean {
	if (search.has('chain') && search.get('chain') != null) {
		const chain = search.get('chain');
		return chain === 'mainnet' || chain === 'testnet' || chain === 'devnet';
	}
	return false;
}
export function setConfigByUrl(search: URLSearchParams, override?: string) {
	if (validChain(search)) {
		const newNetwork = search.get('chain') || override || 'testnet';
		switchConfig(newNetwork);
	} else {
		const newNetwork = override || 'testnet';
		switchConfig(newNetwork);
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set('chain', newNetwork);
		window.history.replaceState({}, '', currentUrl.toString());
		return;
	}
}

export function beforeNavigate(event: { url: URL }) {
	chain.subscribe((currentChain: string) => {
		if (!event.url.searchParams.get('chain')) {
			event.url.searchParams.set('chain', currentChain);
			window.history.replaceState({}, '', event.url.toString());
		}
	});
}
