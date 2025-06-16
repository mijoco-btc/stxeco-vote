export interface DaoConfig {
	VITE_DOA_DEPLOYER: string;
	VITE_DAO_BASE_CONTRACTS: string;
	VITE_DOA: string;
	VITE_DOA_PROPOSAL: string;
	VITE_DAO_MARKET_VOTING: string;
	VITE_DAO_MARKET_GATING: string;
	VITE_DAO_MARKET_PREDICTING: string;
	VITE_DAO_MARKET_SCALAR: string;
	VITE_DAO_MARKET_BITCOIN: string;
	VITE_DAO_CORE_PROPOSALS: string;
	VITE_DAO_CORE_VOTING: string;
	VITE_DAO_TREASURY: string;
	VITE_DAO_GOVERNANCE_TOKEN: string;
	VITE_DAO_TOKEN_SALE: string;
	VITE_DOA_PROPOSAL_VOTING_EXTENSION: string;
	VITE_DOA_FUNDED_SUBMISSION_EXTENSION: string;
	VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: string;
	VITE_DAO_REPUTATION_TOKEN: string;
	VITE_DAO_LIQUIDITY_CONTRIBUTION: string;
}

export const config_dao: { [key: string]: DaoConfig } = {
	devnet: {
		VITE_DOA_DEPLOYER: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
		VITE_DOA: 'bigmarket-dao',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bigmarket-dao',
		VITE_DOA_PROPOSAL: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp001-sip-021-test-01',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bme007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bme002-proposal-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bme004-emergency-execute',
		VITE_DAO_MARKET_VOTING: 'bme021-0-market-voting',
		VITE_DAO_MARKET_GATING: 'bme022-0-market-gating',
		VITE_DAO_MARKET_PREDICTING: 'bme024-0-market-predicting',
		VITE_DAO_MARKET_SCALAR: 'bme024-0-market-scalar-pyth',
		VITE_DAO_MARKET_BITCOIN: 'bme023-0-market-bitcoin',
		VITE_DAO_GOVERNANCE_TOKEN: 'bme000-0-governance-token',
		VITE_DAO_TOKEN_SALE: 'bme010-0-token-sale',
		VITE_DAO_CORE_PROPOSALS: 'bme003-0-core-proposals',
		VITE_DAO_CORE_VOTING: 'bme001-0-proposal-voting',
		VITE_DAO_TREASURY: 'bme006-0-treasury',
		VITE_DAO_REPUTATION_TOKEN: 'bme030-0-reputation-token',
		VITE_DAO_LIQUIDITY_CONTRIBUTION: 'bme010-0-liquidity-contribution'
	},
	testnet: {
		VITE_DOA_DEPLOYER: 'ST3FM52ANQES92X27AP9ZV9Z676MHP7QP2J79RTH9', //'ST167Z6WFHMV0FZKFCRNWZ33WTB0DFBCW9M1FW3AY',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bigmarket-dao',
		VITE_DOA: 'bigmarket-dao',
		VITE_DOA_PROPOSAL: 'ST3FM52ANQES92X27AP9ZV9Z676MHP7QP2J79RTH9.bdp001-sip-021-nakamoto', // 'ST167Z6WFHMV0FZKFCRNWZ33WTB0DFBCW9M1FW3AY.bdp001-sip-021-nakamoto',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bme007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bme008-flexible-funded-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bme004-emergency-execute',
		VITE_DAO_MARKET_VOTING: 'bme021-0-market-voting',
		VITE_DAO_MARKET_GATING: 'bme022-0-market-gating',
		VITE_DAO_MARKET_PREDICTING: 'bme024-0-market-predicting',
		VITE_DAO_MARKET_SCALAR: 'bme024-0-market-scalar-pyth',
		VITE_DAO_MARKET_BITCOIN: 'bme023-0-market-bitcoin',
		VITE_DAO_GOVERNANCE_TOKEN: 'bme000-0-governance-token',
		VITE_DAO_TOKEN_SALE: 'bme010-0-token-sale',
		VITE_DAO_CORE_PROPOSALS: 'bme003-0-core-proposals',
		VITE_DAO_CORE_VOTING: 'bme001-0-proposal-voting',
		VITE_DAO_TREASURY: 'bme006-0-treasury',
		VITE_DAO_REPUTATION_TOKEN: 'bme030-0-reputation-token',
		VITE_DAO_LIQUIDITY_CONTRIBUTION: 'bme010-0-liquidity-contribution'
	},
	mainnet: {
		VITE_DOA_DEPLOYER: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z',
		VITE_DAO_BASE_CONTRACTS: 'ecosystem-dao,bigmarket-dao',
		VITE_DOA: 'bigmarket-dao',
		VITE_DOA_PROPOSAL: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z.bdp001-sip-021-nakamoto',
		VITE_DOA_PROPOSAL_VOTING_EXTENSION: 'bme007-snapshot-proposal-voting',
		VITE_DOA_FUNDED_SUBMISSION_EXTENSION: 'bme008-flexible-funded-submission',
		VITE_DOA_EMERGENCY_EXECUTE_EXTENSION: 'bme004-emergency-execute',
		VITE_DAO_MARKET_VOTING: 'bme021-0-market-voting',
		VITE_DAO_MARKET_GATING: 'bme022-0-market-gating',
		VITE_DAO_MARKET_PREDICTING: 'bme024-0-market-predicting',
		VITE_DAO_MARKET_SCALAR: 'bme024-0-market-scalar-pyth',
		VITE_DAO_MARKET_BITCOIN: 'bme023-0-market-bitcoin',
		VITE_DAO_GOVERNANCE_TOKEN: 'bme000-0-governance-token',
		VITE_DAO_TOKEN_SALE: 'bme010-0-token-sale',
		VITE_DAO_CORE_PROPOSALS: 'bme003-0-core-proposals',
		VITE_DAO_CORE_VOTING: 'bme001-0-proposal-voting',
		VITE_DAO_TREASURY: 'bme006-0-treasury',
		VITE_DAO_REPUTATION_TOKEN: 'bme030-0-reputation-token',
		VITE_DAO_LIQUIDITY_CONTRIBUTION: 'bme010-0-liquidity-contribution'
	}
};
