import { precision } from '$lib/utils';
import { getConfig, getDaoConfig } from '$stores/store_helpers';
import { getStacksNetwork } from '@mijoco/stx_helpers/dist/index';
import { showContractCall } from '@stacks/connect';
import { contractPrincipalCV, PostConditionMode } from '@stacks/transactions';

export const NAKAMOTO_VOTE_START_HEIGHT = 829750 + 100;
export const NAKAMOTO_VOTE_STOPS_HEIGHT = 833950;

export async function extractResponse(response: any) {
	try {
		return await response.json();
	} catch (err) {
		try {
			return await response.text();
		} catch (err) {
			console.log('error fetching response.. ', err);
		}
	}
}

export function dynamicSort(property: any) {
	let sortOrder = 1;
	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substring(1);
	}
	return function (a: any, b: any) {
		/* next line works with strings and numbers,
		 * and you may want to customize it to your needs
		 */
		const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
		return result * sortOrder;
	};
}

export function fromOnChainAmount(amountMicroStx: number, gftPrecision?: number | undefined) {
	try {
		if (amountMicroStx === 0) return 0;
		if (!gftPrecision) gftPrecision = 6;
		const val = (Math.round(amountMicroStx) / 1000000).toFixed(6);
		const parts = val.split('.');
		return '<span class="text-warning">' + parts[0] + '</span>.<span class="part1">' + parts[1] + '</span>';
	} catch {
		return 0;
	}
}
export function toOnChainAmount(amount: number, gftPrecision?: number | undefined) {
	try {
		if (!gftPrecision) {
			//amount = Math.floor(amount * precision)
			//return amount; // Math.round(amount * precision) / precision
			return Math.round(amount * precision * precision) / precision;
		} else {
			const newPrec = Math.pow(10, gftPrecision);
			amount = amount * newPrec;
			return Math.round(amount * newPrec) / newPrec;
		}
	} catch {
		return 0;
	}
}

export async function fetchExchangeRates() {
	const path = `${getConfig().VITE_BRIDGE_API}/rates/v1/tx/rates`;
	try {
		const response = await fetch(path);
		const res = await response.json();
		return res;
	} catch (err) {
		return undefined;
	}
}

export async function getDaoVotesByProposalAndVoter(proposal: string, stxAddress: string) {
	const url = `${getConfig().VITE_BRIDGE_API}/dao-voting/v1/votes/${proposal}/${stxAddress}`;
	const response = await fetch(url);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getDaoSummary(proposal: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao-voting/v1/summary/${proposal}`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getSummaryNodao(proposal: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-voting/v1/results/summary-nodao/${proposal}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function getSummary(proposal: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-voting/v1/results/summary/${proposal}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function getPoolAndSoloAddresses() {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/addresses`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function getPoolAndSoloVotesByProposal(proposalCid: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/votes/${proposalCid}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function getBaseDaoEnabledExtensionEvents(daoContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/get-extensions/${daoContract}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function readBaseDaoEvents(daoContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/read-events-base-dao/${daoContract}`;
	try {
		const response = await fetch(path);
		const res = await extractResponse(response);
		return res;
	} catch (err: any) {
		return;
	}
}

export async function getExtensions(daoContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/get-extensions/${daoContract}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function findDaoVotes(proposalId: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao-voting/v1/proposal/votes/${proposalId}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function findSoloVotes(proposalId: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/results/solo-stackers/${proposalId}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function findPoolVotes(proposalId: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/results/pool-stackers/${proposalId}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function getNftAssetClasses(stxAddress: string) {
	const url = `${getConfig().VITE_BRIDGE_API}/dao/v1/nft/assets-classes/${stxAddress}`;
	const response = await fetch(url);
	const res = await extractResponse(response);
	return res;
}

export async function getNftsbyPage(stxAddress: string, assetId: any, limit: number, offset: number) {
	const assetIdentifier = `${assetId?.contractAddress}.${assetId?.contractName}::${assetId?.assetName}`;
	const url = `${getConfig().VITE_BRIDGE_API}/dao/v1/nft/assets/${stxAddress}/${assetIdentifier}/${limit}/${offset}`;
	const response = await fetch(url);
	const res = await extractResponse(response);
	return res;
}

export async function getDaoVotesByVoter(stxAddress: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao-voting/v1/votes/${stxAddress}`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function findStackerEventsByEventAndAddress(event: string, address: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-events/v1/stacker-events-by-stacker/pox-4/${event}/${address}`;
	const response = await fetch(path);
	return await response.json();
}

export async function findPoolStackerEventsByHashBytes(hashBytes: string, page: number, limit: number) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/stacker-events-by-hashbytes/${hashBytes}/${page}/${limit}`;
	const response = await fetch(path);
	return await response.json();
}

export async function findPoxEntriesByAddress(bitcoinAddress: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/pox-entries/${bitcoinAddress}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function concludeVote(votingContract: string, proposalContract: string) {
	const deployer = getDaoConfig().VITE_DOA_DEPLOYER;
	const proposalCV = contractPrincipalCV(proposalContract.split('.')[0], proposalContract.split('.')[1]);
	await showContractCall({
		network: getStacksNetwork(getConfig().VITE_NETWORK),
		postConditions: [],
		postConditionMode: PostConditionMode.Deny,
		contractAddress: deployer,
		contractName: votingContract.split('.')[1],
		functionName: 'conclude',
		functionArgs: [proposalCV],
		onFinish: (data) => {
			console.log('finished contract call!', data);
			return data.txId;
		},
		onCancel: () => {
			console.log('popup closed!');
		}
	});
}
