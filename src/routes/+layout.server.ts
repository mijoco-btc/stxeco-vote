import type { LayoutServerLoad } from './$types';
import { getCached, setCached } from '$lib/server/cache';
import { fetchExchangeRates } from '$lib/stacks/rates';
import { fetchStacksInfo } from '@mijoco/stx_helpers/dist/index';
import { config, getNetworkFromUrl } from '$lib/config';
import { config_dao } from '$lib/config_dao';

export const load: LayoutServerLoad = async ({ url }) => {
	const network = getNetworkFromUrl(url);
	const appConfig = config[network];

	const key = `layout-data-${network}`;
	console.log('layout-data-network: ' + key);
	const cached = getCached(key);
	if (cached) {
		console.log('CACHE HIT: ' + key);
		return cached;
	}

	const [exchangeRates, stacksInfo] = await Promise.all([fetchExchangeRates(), fetchStacksInfo(appConfig.VITE_STACKS_API)]);

	const result = {
		exchangeRates,
		stacksInfo,
		network
	};
	setCached(key, result, 1000 * 60 * 10); // 10 mins

	return result;
};
