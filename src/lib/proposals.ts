import {
	getStacksNetwork,
	isLoggedIn,
	type TentativeProposal,
	type VotingEventProposeProposal
} from '@mijoco/stx_helpers/dist/index';
import { getConfig, getSession } from '$stores/store_helpers';
import {
	AddressPurpose,
	BitcoinNetworkType,
	getAddress,
	type GetAddressOptions
} from 'sats-connect';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

export const coordinators = [
	{ stxAddress: 'SPSEBFRZZEZSHGRKRR1Z55RX5AWHER3CYM0H9BMW', btcAddress: '' }, // mitchel
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
	{ stxAddress: 'STS4B251PP2HDR9M6TCRCMJ7S908H8GP9QNKJPAQ', btcAddress: '' }, // max
	{ stxAddress: 'SP1PHAGEQ5RWM8G84DFGMRPENKQGFC4QJ9YWXAYKF', btcAddress: '' }, // acrossfire
	{ stxAddress: 'ST306HDPY54T81RZ7A9NGA2F03B8NRGW6Y59ZRZSD', btcAddress: '' }, // coordinator
	{ stxAddress: 'ST3RBZ4TZ3EK22SZRKGFZYBCKD7WQ5B8FFRS57TT6', btcAddress: '' }, // coordinator
	{ stxAddress: 'ST167Z6WFHMV0FZKFCRNWZ33WTB0DFBCW9M1FW3AY', btcAddress: '' }, // coordinator
	{ stxAddress: 'SP1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28GBQA1W0F', btcAddress: '' }, // coordinator
	{ stxAddress: 'SP3JP0N1ZXGASRJ0F7QAHWFPGTVK9T2XNXDB908Z', btcAddress: '' }, // marten
	{ stxAddress: 'SPSEBFRZZEZSHGRKRR1Z55RX5AWHER3CYM0H9BMW', btcAddress: '' } // mitchell
];

export function isCoordinator(address: string | undefined) {
	if (!address || !isLoggedIn()) return false;
	const index = coordinators.findIndex((o) => o.stxAddress === address);
	return index > -1;
}

export async function getBitcoinAddressSatsConnect() {
	let myType = BitcoinNetworkType.Testnet;
	if (getStacksNetwork(getConfig().VITE_NETWORK).isMainnet()) myType = BitcoinNetworkType.Mainnet;
	const getAddressOptions: GetAddressOptions = {
		payload: {
			purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
			message: 'Address for receiving Ordinals and payments',
			network: {
				type: myType
			}
		},
		onFinish: (response: any) => {
			console.log(response);
			const obj = response.addresses;
			return {
				cardinal: obj.find((o: any) => o.purpose === 'payment').address,
				ordinal: obj.find((o: any) => o.purpose === 'ordinals').address,
				btcPubkeySegwit0: obj.find((o: any) => o.purpose === 'payment').publicKey,
				btcPubkeySegwit1: obj.find((o: any) => o.purpose === 'ordinals').publicKey,
				sBTCBalance: 0,
				stxBalance: 0
			};
		},
		onCancel: () => {
			throw new Error('cancelled');
		}
	};
	await getAddress(getAddressOptions);
}

export function isFunding() {
	return false;
}

export function getProposalColor(proposal: VotingEventProposeProposal) {
	if (isProposedPreVoting(proposal)) {
		return 'warning';
	} else if (isVoting(proposal)) {
		return 'green';
	} else {
		return 'danger';
	}
}

export function isProposedPreVoting(proposal: VotingEventProposeProposal) {
	const sess = getSession();
	const currentHeight =
		proposal.submissionContract.indexOf('008') > -1
			? sess.stacksInfo.stacks_tip_height
			: sess.stacksInfo?.burn_block_height || 0;
	return currentHeight < proposal.proposalData.burnStartHeight;
}

export function isVoting(proposal: VotingEventProposeProposal) {
	const sess = getSession();
	//if (window.location.href.indexOf('localhost') > -1) return true;

	const currentHeight =
		proposal.submissionContract.indexOf('008') > -1
			? sess.stacksInfo.stacks_tip_height
			: sess.stacksInfo?.burn_block_height || 0;
	const res = currentHeight >= proposal.proposalData.burnStartHeight;
	return res && currentHeight < proposal.proposalData.burnEndHeight;
}

export function isConclusionPending(proposal: VotingEventProposeProposal) {
	return isPostVoting(proposal) && !proposal.proposalData.concluded;
}

export function isPostVoting(proposal: VotingEventProposeProposal) {
	const sess = getSession();
	const currentHeight =
		proposal.submissionContract.indexOf('008') > -1
			? sess.stacksInfo.stacks_tip_height
			: sess.stacksInfo?.burn_block_height || 0;
	return currentHeight >= proposal.proposalData.burnEndHeight;
}

export async function getFunding(submissionContract: string, proposalContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/get-funding/${submissionContract}/${proposalContract}`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getAllProposals() {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/all-proposals`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getActiveProposals() {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/active-proposals`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getTentativeProposals() {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/tentative-proposals`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getConcludedProposals() {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/concluded-proposals`;
	const response = await fetch(path);
	if (response.status === 404) return [];
	const res = await response.json();
	return res;
}

export async function getProposalLatest(proposal: string): Promise<VotingEventProposeProposal> {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/get-proposal/${proposal}`;
	const response = await fetch(path);
	if (response.status === 404) throw new Error('not found ' + proposal);
	const res = await response.json();
	return res;
}

export async function getTentativeProposal(
	proposalId: string
): Promise<TentativeProposal | undefined> {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/get-tentative-proposal/${proposalId}`;
	const response = await fetch(path);
	if (response.status === 404) return;
	const res = await response.json();
	return res;
}

export async function getBaseDaoExecutedProposalEvents(daoContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/proposals/v1/get-executed-proposals/${daoContract}`;
	const response = await fetch(path);
	if (response.status === 404) return;
	const res = await response.json();
	return res;
}

export async function isExecutiveTeamMember(
	stxAddress: string
): Promise<{ executiveTeamMember: boolean }> {
	return stxAddress && stxAddress === getConfig().VITE_DOA_DEPLOYER
		? { executiveTeamMember: true }
		: { executiveTeamMember: false };

	//const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/is-executive-team-member/${stxAddress}`;
	//const response = await fetch(path);
	//const res = await response.json();
	//return res;
}

export async function isExtension(extensionAddress: string): Promise<{ result: boolean }> {
	if (!extensionAddress) return { result: false };
	const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/is-extension/${extensionAddress}`;
	const response = await fetch(path);
	const res = await response.json();
	return res;
}

export function getCurrentProposalLink(name: string): { name: string; address: string } {
	return { name: 'Proposal is loading', address: '/' };
}

export function getProposalNotFoundLink(): { name: string; address: string } {
	return { name: 'Proposal not found', address: '/' };
}
