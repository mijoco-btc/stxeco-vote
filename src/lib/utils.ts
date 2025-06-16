import { getSelectedCurrency, getSession } from '$stores/store_helpers';
import { type ExchangeRate, type Sip10Data } from '@mijoco/stx_helpers/dist/index';
import { DateTime } from 'luxon';

export const COMMS_ERROR = 'Error communicating with the server. Please try later.';
export const smbp = 900;
export const xsbp = 700;

export const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[^\s]*)?$/i;

export function splitMerkleProof(proofHex: string): string[] {
	if (proofHex.length === 0) return [];
	if (!proofHex || proofHex.length % 64 !== 0) {
		throw new Error('Invalid proof length: must be a multiple of 64 hex chars (32 bytes per hash)');
	}

	const proofList: string[] = [];
	for (let i = 0; i < proofHex.length; i += 64) {
		proofList.push(proofHex.slice(i, i + 64)); // Extract 32-byte chunks (64 hex chars)
	}
	return proofList;
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array]; // Clone to avoid mutating the original
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
	}
	return shuffled;
}

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: getSelectedCurrency().code
	// These options are needed to round to whole numbers if that's what you want.
	// minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	// maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const precision = 1000000;
const btcPrecision = 100000000;
const stxPrecision = 1000000;
const currencyToLocale: Record<string, string> = {
	USD: 'en-US',
	EUR: 'de-DE',
	GBP: 'en-GB',
	JPY: 'ja-JP',
	AUD: 'en-AU',
	CAD: 'en-CA',
	CHF: 'de-CH',
	CNY: 'zh-CN',
	INR: 'en-IN'
	// add more as needed
};

export function formatFiat(raw: number, bare?: boolean): string {
	const value = raw;
	const c = getSelectedCurrency();
	const locale = currencyToLocale[c.code] || 'en-US';
	if (bare) {
		return value.toLocaleString(locale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	} else {
		return value.toLocaleString(locale, {
			style: 'currency',
			currency: c.code,
			currencyDisplay: 'code', // shows "USD 1,234.56"
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
}

export function bitcoinToSats(amountBtc: number) {
	return Math.round(amountBtc * btcPrecision);
}

export function fmtSatoshiToBitcoin(amountSats: number) {
	return (Math.round(amountSats) / btcPrecision).toFixed(8);
}

export function satsToBitcoin(amountSats: number): number {
	return Number((Math.round(amountSats) / btcPrecision).toFixed(8));
}

export function userSatBtc(amount: number, denomination: string): number {
	if (denomination === 'bitcoin') {
		if (amount.toString().indexOf('.') === -1) {
			return Number((Math.round(amount) / btcPrecision).toFixed(8));
		}
		return amount;
	} else {
		return bitcoinToSats(amount);
	}
}

export function fromMicroAmount(amountMicroStx: number) {
	if (amountMicroStx === 0) return 0;
	try {
		if (amountMicroStx === 0) return 0;
		const val = Math.round(amountMicroStx) / precision;
		return val;
	} catch {
		return 0;
	}
}

export function fmtMicroToStxFormatted(amountStx: number) {
	const converted = amountStx / 1e6; // Divide by 10^6 to shift 6 decimal places
	const formatted = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 6,
		maximumFractionDigits: 6
	}).format(converted);

	console.log(formatted); // Outputs: "99,999,999.452471"

	return formatted;
}

export function fmtRoundToNDecimalPlaces(value: number, n: number): number {
	return Number(value.toFixed(n));
}

export function fmtMicroToStx(amount: number, decimals?: number): string {
	const conv = Number(`1e${decimals}`);
	if (!decimals) {
		return String(amount / 1e6);
	}
	return (amount / conv).toFixed(decimals);
}

export function fmtMicroToStxNumber(amount: number, decimals?: number): number {
	const conv = Number(`1e${decimals}`);
	if (!decimals) {
		return amount / 1e6;
	}
	return amount / conv;
}

export function trimTrailingZeros(value: number | string): string {
	return parseFloat(value.toString()).toString();
}

export function getRate(currencyCode: string): ExchangeRate {
	const rates = getSession().exchangeRates;
	const rate = rates.find((o) => o.currency === currencyCode);
	if (!rate)
		return {
			symbol: '$',
			name: 'US Dollar',
			currency: 'USD'
		} as ExchangeRate;
	return rate;
}

export function estimateBitcoinBlockTime(targetBlock: number, currentBlock: number, currentTimeUtc: string = DateTime.utc().toISO()): string {
	const BLOCK_INTERVAL_SEC = 600; // 10 minutes per block
	const blockDifference = targetBlock - (currentBlock || 0);
	const timeShiftSeconds = blockDifference * BLOCK_INTERVAL_SEC;
	const currentTime = DateTime.fromISO(currentTimeUtc, { zone: 'utc' });
	const estimatedTime = currentTime.plus({ seconds: timeShiftSeconds });
	return estimatedTime.toFormat('yyyy-MM-dd HH:mm');
}

export function toFiat(currencyCode: string, amountMicro: number, sip10Data: Sip10Data, tokenPrice?: number, fixed?: number): string {
	const rate = getRate(currencyCode);
	const amount = fmtMicroToStxNumber(amountMicro, sip10Data.decimals);
	if (sip10Data.symbol === 'STX') {
		return (amount * (rate?.fifteen || 0) * (rate?.stxToBtc || 0)).toFixed(fixed || 2);
	} else if (sip10Data.symbol === 'BIG') {
		return (amount * (rate?.fifteen || 0) * (rate?.stxToBtc || 0) * (tokenPrice || 1)).toFixed(fixed || 2);
	} else {
		return (amount * (rate?.fifteen || 0)).toFixed(fixed || 2);
	}
}

export function fmtStxMicro(amountStx: number, decimals?: number) {
	if (!decimals) {
		return (Math.round(amountStx) * stxPrecision * stxPrecision) / stxPrecision;
	}
	const conversion = Number(`1e${decimals}`);
	return amountStx * conversion;
}

export function fmtStxMicroGeneral(amountStx: number, decimals: number) {
	const conversion = Number(`1e${decimals}`);
	return Math.round(amountStx) * conversion;
}

export function tsToTime(updated: number | undefined) {
	let d = new Date();
	if (updated) d = new Date(updated);
	//return d.toLocaleDateString('en-UK');
	return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

export function tsToDate(updated: number | undefined) {
	let d = new Date();
	if (updated) d = new Date(updated);
	return d.toLocaleDateString('en-UK');
	//return d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear();
}

export function fmtAmount(amount: number, currency: string) {
	if (currency === 'stx') {
		return formatter.format(amount).replace('$', ''); // &#931;
	}
}

export function fmtNumberStacksFloor(amount: number | undefined) {
	if (!amount || amount === 0) return '0';
	return fmtNumber(Math.floor(Number(fmtMicroToStx(amount))));
}

export function fmtNumber(amount: number | undefined) {
	if (amount === 0) return '0';
	if (amount) return new Intl.NumberFormat().format(amount);
}

export function truncate(stringy?: string, amount?: number) {
	if (!stringy) return '?';
	if (!amount) amount = 4;
	return stringy.substring(0, amount) + '...' + stringy.substring(stringy.length - amount);
}

export function truncateEnd(stringy?: string, amount?: number) {
	if (!stringy) return '?';
	if (!amount) amount = 4;
	return '..' + stringy.substring(stringy.length - amount);
}

export function compareCurrencies(a: { value: string; name: string }, b: { value: string; name: string }) {
	if (a.value < b.value) {
		return -1;
	}
	if (a.value > b.value) {
		return 1;
	}
	return 0;
}

export function downloadCsv(data: any, filename: string) {
	// Creating a Blob for having a csv file format
	// and passing the data with type
	const blob = new Blob([data], { type: 'text/csv' });
	// Creating an object for downloading url
	const url = typeof window !== 'undefined' ? window.URL.createObjectURL(blob) : '';
	// Creating an anchor(a) tag of HTML
	const a = document.createElement('a');
	// Passing the blob downloading url
	a.setAttribute('href', url);
	// Setting the anchor tag attribute for downloading
	// and passing the download file name
	a.setAttribute('download', filename);
	// Performing a download with click
	a.click();
	return data;
}

export function csvMaker(inputData: Array<any>, fileName: string) {
	// Empty array for storing the values
	const csvRows = [];
	// Headers is basically a keys of an object
	// which is id, name, and profession
	const headers = Object.keys(inputData[0]);
	// As for making csv format, headers must
	// be separated by comma and pushing it
	// into array
	csvRows.push(headers.join(','));
	// Pushing Object values into array
	// with comma separation
	for (const vote of inputData) {
		csvRows.push(Object.values(vote).join(','));
	}
	// Returning the array joining with new line
	const data = csvRows.join('\n');
	downloadCsv(data, fileName);
}
