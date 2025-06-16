import { fetchExchangeRates } from '$lib/stacks/rates';
import { fetchStacksInfo } from '@mijoco/stx_helpers';
import { getCached, setCached } from './cache';

// ✅ Inline cache warmer
export function startCacheWarming() {
	const layoutKey = 'layout-data-testnet';
	const homeKey = 'home-page';
	const VITE_STACKS_API = 'https://api.testnet.hiro.so';

	setInterval(async () => {
		try {
			if (!getCached(layoutKey)) {
				console.log('[warm] layout...');
				const [exchangeRates, stacksInfo] = await Promise.all([fetchExchangeRates(), fetchStacksInfo(VITE_STACKS_API)]);
				setCached(layoutKey, { exchangeRates, stacksInfo }, 1000 * 30);
			}

			if (!getCached(homeKey)) {
				console.log('[warm] home...');
				//const [markets, leaderBoard] = await Promise.all([fetchMarkets(), getLeaderBoard()]);
				setCached(homeKey, {}, 1000 * 30);
			}
		} catch (err) {
			console.error('[warm] error:', err);
		}
	}, 1000 * 25);
}
