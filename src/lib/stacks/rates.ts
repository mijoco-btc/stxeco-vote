import { getConfig } from '$stores/store_helpers';
import { type ExchangeRate } from '@mijoco/stx_helpers/dist/index';

export async function fetchExchangeRates(): Promise<Array<ExchangeRate>> {
	const path = `${getConfig().VITE_BIGMARKET_API}/exchange/rates`;
	// const path = `https://api.stx.eco/bridge-api/rates/v1/tx/rates`;
	try {
		const response = await fetch(path);
		const res = await response.json();
		return res.result;
	} catch (err) {
		return [];
	}
}
