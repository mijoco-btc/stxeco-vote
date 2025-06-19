import { getConfig } from '$stores/store_helpers';

export async function readStackerEvents(proposalContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-voting/v1/read-stacker-votes/${proposalContract}`;
	const response = await fetch(path);
	if (response.status === 404) return 'not found';
	const res = await response.json();
	return res;
}

export async function reconcileStackerEvents(proposalContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-voting/v1/reconcile-stacker-votes/${proposalContract}`;
	const response = await fetch(path);
	if (response.status === 404) return 'not found';
	const res = await response.json();
	return res;
}

export async function getStackerEvents(proposalContract: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-voting/v1/get-stacker-votes/${proposalContract}`;
	const response = await fetch(path);
	if (response.status === 404) return 'not found';
	const res = await response.json();
	return res;
}

export async function readVotingContractEvents(genesis: boolean, daoContract: string, votingContract: string | undefined) {
	const path = `${getConfig().VITE_BRIDGE_API}/dao-voting/v1/read-votes/${genesis}/${daoContract}/${votingContract}`;
	const response = await fetch(path);
	if (response.status === 404) return 'not found';
	const res = await response.json();
	return res;
}
