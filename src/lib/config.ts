import type { HeaderLink } from '@mijoco/stx_helpers/dist/index';

export const appDetails = {
	name: 'bitcoin-dao',
	icon: '/img/stx_eco_logo_icon_white.png'
};

export function getNetworkFromUrl(url: URL): string {
	const chain = url.searchParams.get('chain');
	return chain && ['mainnet', 'testnet', 'devnet'].includes(chain) ? chain : 'mainnet';
	// return 'devnet';
}

export interface Config {
	VITE_PUBLIC_APP_NAME: string;
	VITE_PUBLIC_APP_VERSION: string;
	VITE_NETWORK: string;
	VITE_POLL_PAYMENT_USTX: number;
	VITE_SUI_API: string;
	VITE_BRIDGE_API: string;
	VITE_STACKS_API: string;
	VITE_STACKS_EXPLORER: string;
	VITE_MEMPOOL_API: string;
	VITE_BITCOIN_WALLET: string;
	VITE_CLARITY_BITCOIN: string;
	VITE_HEADER_LINKS: Array<HeaderLink>;
	VITE_POX_CONTRACT_ID: string;
}

export const config: { [key: string]: Config } = {
	devnet: {
		VITE_PUBLIC_APP_NAME: 'BigMarket',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'devnet',
		VITE_SUI_API: 'http://localhost:9001',
		VITE_BRIDGE_API: 'http://localhost:3010/bridge-api',
		VITE_STACKS_API: 'http://localhost:3999',
		VITE_STACKS_EXPLORER: 'http://localhost:8000',
		VITE_POX_CONTRACT_ID: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-4',
		VITE_MEMPOOL_API: 'http://localhost:8001',
		VITE_POLL_PAYMENT_USTX: 50000000,
		VITE_BITCOIN_WALLET: 'bcrt1q4zymxl8934vvle2ppzw0j6tkwz3d7qw4f0esme',
		VITE_CLARITY_BITCOIN: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-lib-v5',
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: '/',
				display: 'Voting',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: '/proposal/results-v1/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp001-sip-021-nakamoto?method=1',
						display: 'SIP 021 Nakamoto Upgrade',
						target: '_self'
					}
				]
			},
			{
				name: '/admin',
				href: '/admin',
				display: 'Admin',
				target: '_self',
				items: [
					{ name: '/proposals', href: '/dao/proposals', display: 'Proposals', target: '_self' },
					{ name: '/extensions', href: '/dao/extensions', display: 'Extensions', target: '_self' },
					{ name: '/construct', href: '/dao/construct', display: 'Construct DAO', target: '_self' }
				]
			},
			{ name: '/sip', href: '/sip', display: 'Upcoming SIPs', target: '_self' },
			{ name: '/tools', href: '/dao/tools', display: 'PoX Cycles', target: '_self' }
		]
	},
	testnet: {
		VITE_PUBLIC_APP_NAME: 'BigMarket',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'testnet',
		VITE_STACKS_API: 'https://api.testnet.hiro.so',
		VITE_STACKS_EXPLORER: 'https://explorer.hiro.so',
		VITE_BRIDGE_API: 'https://api.stx.eco/bridge-api',
		VITE_SUI_API: 'http://localhost:9001',
		VITE_POX_CONTRACT_ID: 'ST000000000000000000002AMW42H.pox-4',
		VITE_MEMPOOL_API: 'https://beta.sbtc-mempool.tech/api/proxy', //0bbc856394ffdab7e69e0b2b8ddb1fa7e901974cd89b90a64349b48b643c7e9c
		VITE_POLL_PAYMENT_USTX: 50000000,
		VITE_BITCOIN_WALLET: 'bcrt1q4zymxl8934vvle2ppzw0j6tkwz3d7qw4f0esme',
		VITE_CLARITY_BITCOIN: 'ST3FM52ANQES92X27AP9ZV9Z676MHP7QP2J79RTH9.clarity-bitcoin-lib-v5',
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: 'https://stx.eco',
				display: 'Past Votes',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: 'https://stx.eco/proposal/results-v1/SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto?method=1',
						display: 'SIP 021 Nakamoto Upgrade',
						target: '_self'
					}
				]
			},
			{
				name: '/admin',
				href: '/admin',
				display: 'Admin',
				target: '_self',
				items: [
					{ name: '/proposals', href: '/dao/proposals', display: 'Proposals', target: '_self' },
					{ name: '/extensions', href: '/dao/extensions', display: 'Extensions', target: '_self' },
					{ name: '/dao-launcher', href: '/dao-launcher', display: 'DAO Launcher', target: '_self' }
				]
			},
			{ name: '/sip', href: '/sip', display: 'Upcoming Votes', target: '_self' },
			{ name: '/insights', href: 'https://stx.eco/insights', display: 'Insights', target: '_self' },
			{ name: '/dao-launcher', href: 'https://stx.eco/launcher', display: 'DAO', target: '_self' },
			{
				name: '/shop-front',
				href: 'https://stx.eco/shop-front',
				display: 'Shop Front',
				target: '_self'
			},
			{ name: '/tools', href: '/dao/tools', display: 'pox cycles', target: '_self' }
		]
	},
	mainnet: {
		VITE_PUBLIC_APP_NAME: 'BigMarket',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'mainnet',
		VITE_STACKS_API: 'https://api.hiro.so',
		VITE_STACKS_EXPLORER: 'https://explorer.hiro.so',
		VITE_BRIDGE_API: 'https://api.stx.eco/bridge-api',
		VITE_SUI_API: 'http://localhost:9001',
		VITE_POX_CONTRACT_ID: 'SP000000000000000000002Q6VF78.pox-4',
		VITE_MEMPOOL_API: 'https://mempool.space/api',
		VITE_POLL_PAYMENT_USTX: 50000000,
		VITE_BITCOIN_WALLET: 'bcrt1q4zymxl8934vvle2ppzw0j6tkwz3d7qw4f0esme',
		VITE_CLARITY_BITCOIN: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.clarity-bitcoin-lib-v5',
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: 'https://stx.eco',
				display: 'Past Votes',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: 'https://stx.eco/proposal/results-v1/SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto?method=1',
						display: 'SIP 021 Nakamoto Upgrade',
						target: '_self'
					}
				]
			},
			{
				name: '/admin',
				href: '/admin',
				display: 'Admin',
				target: '_self',
				items: [
					{ name: '/tools', href: '/dao/tools', display: 'pox cycles', target: '_self' },
					{ name: '/proposals', href: '/dao/proposals', display: 'Proposals', target: '_self' },
					{ name: '/extensions', href: '/dao/extensions', display: 'Extensions', target: '_self' },
					{ name: '/construct', href: '/dao/construct', display: 'Construct DAO', target: '_self' }
				]
			}
		]
	}
};
