import type { HeaderLink } from '@mijoco/stx_helpers/dist/index';

export const daoVotingSupported = false;

export const appDetails = {
	name: 'Ecosystem DAO',
	icon: window
		? window.location.origin + '/img/stx_eco_logo_icon_white.png'
		: '/img/stx_eco_logo_icon_white.png'
};
export interface Config {
	VITE_PUBLIC_APP_NAME: string;
	VITE_PUBLIC_APP_VERSION: string;
	VITE_NETWORK: string;
	VITE_DOA_DEPLOYER: string;
	VITE_DAO_BASE_CONTRACTS: string;
	VITE_DOA: string;
	VITE_DOA_PROPOSAL: string;
	VITE_DOA_SNAPSHOT_VOTING_EXTENSION: string;
	VITE_DOA_PROPOSAL_VOTING_EXTENSION: string;
	VITE_DOA_FUNDED_SUBMISSION_EXTENSION: string;
	VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: string;
	VITE_SBTC_COORDINATOR: string;
	VITE_SBTC_CONTRACT_ID: string;
	VITE_POX_CONTRACT_ID: string;
	VITE_BRIDGE_API: string;
	VITE_STACKS_API: string;
	VITE_MEMPOOL_API: string;
	VITE_MEMPOOL: string;
	VITE_STACKS_WS: string;
	VITE_STACKS_EXPLORER: string;
	VITE_EXTENSIONS: Array<string>;
	VITE_HEADER_LINKS: Array<HeaderLink>;
}

export const config: { [key: string]: Config } = {
	devnet: {
		VITE_PUBLIC_APP_NAME: 'Stacks Ecosystem DAO Testnet',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'devnet',
		VITE_DOA_DEPLOYER: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
		VITE_DOA: 'bitcoin-dao',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bitcoin-dao',
		VITE_DOA_PROPOSAL: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp001-sip-021-test-01',
		VITE_DOA_SNAPSHOT_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bde002-proposal-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bde004-emergency-execute',
		VITE_SBTC_COORDINATOR: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
		VITE_SBTC_CONTRACT_ID: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.asset-3',
		VITE_POX_CONTRACT_ID: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-4',
		VITE_BRIDGE_API: 'http://localhost:3010/bridge-api',
		VITE_STACKS_API: 'http://localhost:3999',
		VITE_STACKS_WS: 'ws://localhost:3999',
		VITE_STACKS_EXPLORER: 'http://localhost:8000',
		VITE_MEMPOOL_API: 'http://localhost:8001',
		VITE_MEMPOOL: 'https://mempool.space',
		VITE_EXTENSIONS: [
			'bde000-governance-token',
			'bde001-proposal-voting',
			'bde002-threshold-proposal-submission',
			'bde003-emergency-proposals',
			'bde004-emergency-execute',
			'bde005-dev-fund',
			'bde006-treasury',
			'bde007-snapshot-proposal-voting',
			'bde008-funded-proposal-submission',
			'bde009-governance-token-sale'
		],
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: '/',
				display: 'Voting',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: '/dao/proposals/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp001-sip-021-nakamoto/results?method=1',
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
					{ name: '/extensions', href: '/dao/extensions', display: 'Extensions', target: '_self' }
				]
			},
			{ name: '/tools', href: '/dao/tools', display: 'PoX Insights', target: '_self' },
			{ name: '/sip', href: '/sip', display: 'Upcoming SIPs', target: '_self' }
		]
	},
	testnet: {
		VITE_PUBLIC_APP_NAME: 'Stacks Ecosystem DAO',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'mainnet',
		VITE_DOA_DEPLOYER: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bitcoin-dao',
		VITE_DOA: 'bitcoin-dao',
		VITE_DOA_PROPOSAL: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto',
		VITE_DOA_SNAPSHOT_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bde008-flexible-funded-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bde004-emergency-execute',
		VITE_SBTC_COORDINATOR: 'ST3SPZXMPYVNHH3KF0RXNXVX1WVJ3QM1ZMD5FKWDN',
		VITE_SBTC_CONTRACT_ID: 'ST3SPZXMPYVNHH3KF0RXNXVX1WVJ3QM1ZMD5FKWDN.asset',
		VITE_POX_CONTRACT_ID: 'ST000000000000000000002AMW42H.pox-4',
		VITE_BRIDGE_API: 'https://api.stx.eco/bridge-api',
		//VITE_BRIDGE_API: 'http://localhost:3010/bridge-api',
		VITE_STACKS_API: 'https://api.hiro.so',
		VITE_STACKS_WS: 'ws://spinoza.brightblock.org',
		VITE_STACKS_EXPLORER: 'https://explorer.hiro.so',
		VITE_MEMPOOL_API: 'https://mempool.space/api',
		VITE_MEMPOOL: 'https://mempool.space',
		VITE_EXTENSIONS: [
			'bde000-governance-token',
			'bde001-proposal-voting',
			'bde002-threshold-proposal-submission',
			'bde003-emergency-proposals',
			'bde004-emergency-execute',
			'bde005-dev-fund',
			'bde006-treasury',
			'bde007-snapshot-proposal-voting',
			'bde008-funded-proposal-submission',
			'bde009-governance-token-sale'
		],
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: 'https://stx.eco',
				display: 'Past Votes',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: 'https://stx.eco/dao/proposals/SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto/results?method=1',
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
			{ name: '/tools', href: '/dao/tools', display: 'PoX Insights', target: '_self' },
			{ name: '/sip', href: '/sip', display: 'Upcoming Votes', target: '_self' },
			{ name: '/insights', href: 'https://stx.eco/insights', display: 'Insights', target: '_self' },
			{ name: '/dao-launcher', href: 'https://stx.eco/launcher', display: 'DAO', target: '_self' },
			{
				name: '/shop-front',
				href: 'https://stx.eco/shop-front',
				display: 'Shop Front',
				target: '_self'
			}
		]
	},
	mainnet: {
		VITE_PUBLIC_APP_NAME: 'Stacks Ecosystem DAO',
		VITE_PUBLIC_APP_VERSION: '1.0.0',
		VITE_NETWORK: 'mainnet',
		VITE_DOA_DEPLOYER: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bitcoin-dao',
		VITE_DOA: 'bitcoin-dao',
		VITE_DOA_PROPOSAL: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto',
		VITE_DOA_SNAPSHOT_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bde007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bde008-flexible-funded-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bde004-emergency-execute',
		VITE_SBTC_COORDINATOR: 'ST3SPZXMPYVNHH3KF0RXNXVX1WVJ3QM1ZMD5FKWDN',
		VITE_SBTC_CONTRACT_ID: 'ST3SPZXMPYVNHH3KF0RXNXVX1WVJ3QM1ZMD5FKWDN.asset',
		VITE_POX_CONTRACT_ID: 'SP000000000000000000002Q6VF78.pox-4',

		VITE_BRIDGE_API: 'https://api.stx.eco/bridge-api',
		//VITE_BRIDGE_API: 'http://localhost:3010/bridge-api',

		VITE_STACKS_API: 'https://api.hiro.so',
		VITE_STACKS_WS: 'ws://spinoza.brightblock.org',
		VITE_STACKS_EXPLORER: 'https://explorer.hiro.so',
		VITE_MEMPOOL_API: 'https://mempool.space/api',
		VITE_MEMPOOL: 'https://mempool.space',
		VITE_EXTENSIONS: [
			'bde000-governance-token',
			'bde001-proposal-voting',
			'bde002-threshold-proposal-submission',
			'bde003-emergency-proposals',
			'bde004-emergency-execute',
			'bde005-dev-fund',
			'bde006-treasury',
			'bde007-snapshot-proposal-voting',
			'bde008-funded-proposal-submission',
			'bde009-governance-token-sale'
		],
		VITE_HEADER_LINKS: [
			{
				name: '/voting',
				href: 'https://stx.eco',
				display: 'Past Votes',
				target: '_self',
				items: [
					{
						name: '/bdp001-sip-021-nakamoto',
						href: 'https://stx.eco/dao/proposals/SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto/results?method=1',
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
			{ name: '/tools', href: '/dao/tools', display: 'PoX Insights', target: '_self' },
			{ name: '/sip', href: '/sip', display: 'Upcoming Votes', target: '_self' },
			{ name: '/insights', href: 'https://stx.eco/insights', display: 'Insights', target: '_self' },
			{ name: '/dao-launcher', href: 'https://stx.eco/launcher', display: 'DAO', target: '_self' },
			{
				name: '/shop-front',
				href: 'https://stx.eco/shop-front',
				display: 'Shop Front',
				target: '_self'
			}
		]
	}
};
