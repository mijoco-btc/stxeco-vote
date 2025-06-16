import { connect, getLocalStorage, disconnect, isConnected } from '@stacks/connect';
import { getConfig, getSession } from '$stores/store_helpers';
import { ChainId, STACKS_DEVNET, STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { Cl, stringAsciiCV, uintCV } from '@stacks/transactions';
import type { GetAddressesResult } from '@stacks/connect/dist/types/methods';
import type { AddressObject } from '@mijoco/stx_helpers/dist/index';

const NETWORK_DEVNET = {
	addressVersion: {
		multiSig: 21,
		singleSig: 26
	},
	MAGIC_BYTES: 'T2',
	chainId: 2147483648
};
const NETWORK_TESTNET = {
	addressVersion: {
		multiSig: 21,
		singleSig: 26
	},
	MAGIC_BYTES: 'T2',
	chainId: 2147483648
};
const NETWORK_MAINNET = {
	addressVersion: {
		multiSig: 20,
		singleSig: 22
	},
	MAGIC_BYTES: 'X2',
	chainId: 2147483648
};

export const domain = {
	name: getConfig().VITE_PUBLIC_APP_NAME,
	version: getConfig().VITE_PUBLIC_APP_VERSION,
	'chain-id': getConfig().VITE_NETWORK === 'mainnet' ? ChainId.Testnet : ChainId.Testnet
};
export function domainCV(domain: any) {
	return Cl.tuple({
		name: stringAsciiCV(domain.name),
		version: stringAsciiCV(domain.version),
		'chain-id': uintCV(domain['chain-id'])
	});
}

export async function getUserData() {
	const userData = getLocalStorage();
	return userData;
}

export async function authenticate(callback?: () => void) {
	//const req: ConnectRequestOptions = {} as ConnectRequestOptions;
	const response: GetAddressesResult = await connect({});
	console.log('authenticate: ', response);
	const stxProvider = localStorage.getItem('STX_PROVIDER');
	console.log('STX Provider from LocalStorage:', stxProvider);
	// XverseProviders.BitcoinProvider

	if (callback) callback();
}

export function isLoggedIn() {
	const connected = isConnected();
	return connected;
}

export function getStxAddress() {
	const userData = getLocalStorage();
	return userData?.addresses.stx[0].address || '???';
}

export function getBtcAddress() {
	const userData = getLocalStorage();
	return userData?.addresses.btc[0].address || '???';
}

export function getStxBalance() {
	if (!isLoggedIn()) return 0;
	const sess = getSession();
	return sess.keySets[getConfig().VITE_NETWORK]?.walletBalances?.stacks?.amount || 0;
}

export function getBtcBalance() {
	if (!isLoggedIn()) return 0;
	const sess = getSession();
	return sess.keySets[getConfig().VITE_NETWORK]?.walletBalances?.cardinal?.amount || 0;
}

export function getStxNetwork() {
	const network = getConfig().VITE_NETWORK;
	if (network === 'devnet') {
		return STACKS_DEVNET;
	} else if (network === 'testnet') {
		return STACKS_TESTNET;
	} else {
		return STACKS_MAINNET;
	}
}

export function loginStacksFromHeader(document: any) {
	const el = document.getElementById('connect-wallet');
	if (el) return document.getElementById('connect-wallet').click();
	else return false;
}

export function logUserOut() {
	return disconnect();
}

export const coordinators = [
	{ stxAddress: 'ST2SACH111M97FZWN2Z8XMJ1FCKSJM3NGE35S6ZKN', btcAddress: 'xverse testnet' }, // devnet + electrum bob
	{ stxAddress: 'SP2SACH111M97FZWN2Z8XMJ1FCKSJM3NGE37MGXAT', btcAddress: 'xverse mainnet' }, // devnet + electrum bob
	{ stxAddress: 'SP2F0DP9Z3KSS0DABDBJN0DA0SHMCVWHXPVTH3PJJ', btcAddress: '' }, // devnet + electrum bob
	{ stxAddress: 'ST3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNZN9J752', btcAddress: '' }, // devnet + electrum bob
	{
		stxAddress: 'ST1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28G8HXK9G5',
		btcAddress: 'bc1qkj5yxgm3uf78qp2fdmgx2k76ccdvj7rx0qwhv0'
	}, // devnet + electrum bob
	{
		stxAddress: 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT',
		btcAddress: 'bc1qkj5yxgm3uf78qp2fdmgx2k76ccdvj7rx0qwhv0'
	}, // devnet + electrum bob
	{
		stxAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
		btcAddress: 'tb1q6ue638m4t5knwxl4kwhwyuffttlp0ffee3zn3e'
	}, // devnet + electrum bob
	{
		stxAddress: 'SP3N4AJFZZYC4BK99H53XP8KDGXFGQ2PRSQP2HGT6',
		btcAddress: 'tb1q6ue638m4t5knwxl4kwhwyuffttlp0ffee3zn3e'
	}, // mijoco staging + electrum bob
	{
		stxAddress: 'ST3N4AJFZZYC4BK99H53XP8KDGXFGQ2PRSPNET8TN',
		btcAddress: 'tb1q6ue638m4t5knwxl4kwhwyuffttlp0ffee3zn3e'
	}, // mijoco production + electrum bob
	{ stxAddress: 'ST167Z6WFHMV0FZKFCRNWZ33WTB0DFBCW9M1FW3AY', btcAddress: '' },
	{ stxAddress: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F', btcAddress: '' },
	{ stxAddress: 'ST3FM52ANQES92X27AP9ZV9Z676MHP7QP2J79RTH9', btcAddress: '' }
];

export function isCoordinator(address: string | undefined) {
	if (!address || !isLoggedIn()) return false;
	const index = coordinators.findIndex((o) => o.stxAddress === address);
	return index > -1;
}

export function explorerAddressUrl(addr: string) {
	if (getConfig().VITE_NETWORK === 'devnet') {
		return `${getConfig().VITE_STACKS_EXPLORER}/address/${addr}?chain=testnet&api=http://localhost:3999`;
	} else if (getConfig().VITE_NETWORK === 'testnet') {
		return `${getConfig().VITE_STACKS_EXPLORER}/address/${addr}?chain=testnet`;
	} else {
		return `${getConfig().VITE_STACKS_EXPLORER}/address/${addr}?chain=mainnet`;
	}
}
export function explorerBtcTxUrl(txid: string | undefined) {
	if (!txid) return '?';
	if (txid.startsWith('0x')) txid = txid.split('x')[1];
	return getConfig().VITE_MEMPOOL_API + '/tx/' + txid;
}

export function explorerBtcAddressUrl(address: string | undefined) {
	if (!address) return '';
	return getConfig().VITE_MEMPOOL_API + '/address/' + address;
}
export function explorerTxUrl(txid: string) {
	if (getConfig().VITE_NETWORK === 'devnet') {
		return `${getConfig().VITE_STACKS_EXPLORER}/txid/${txid}?chain=testnet&api=http://localhost:3999`;
	} else if (getConfig().VITE_NETWORK === 'testnet') {
		return `${getConfig().VITE_STACKS_EXPLORER}/txid/${txid}?chain=testnet`;
	} else {
		return `${getConfig().VITE_STACKS_EXPLORER}/txid/${txid}?chain=mainnet`;
	}
}
export function getAddressId() {
	return getStxAddress()?.substring(0, 5) || 'not connected';
}

export async function addresses(): Promise<AddressObject> {
	if (!isLoggedIn()) return {} as AddressObject;
	const userData = await getUserData();
	const result: AddressObject = {
		stxAddress: userData?.addresses.stx[0].address || 'unknown',
		cardinal: userData?.addresses.btc[0].address || 'unknown',
		ordinal: userData?.addresses.btc[1].address || 'unknown',
		btcPubkeySegwit0: 'unknown',
		btcPubkeySegwit1: 'unknown',
		sBTCBalance: 0,
		stxBalance: 0
	};

	return result;
}

export function isXverse(): boolean {
	const stxProvider = localStorage.getItem('STX_PROVIDER') || '';
	return stxProvider.toLowerCase().indexOf('xverse') > -1;
}
export function isLeather(): boolean {
	const stxProvider = localStorage.getItem('STX_PROVIDER') || '';
	return stxProvider.toLowerCase().indexOf('leather') > -1;
}
