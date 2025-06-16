import type { PoxEntry } from '@mijoco/stx_helpers/dist';
import { getConfig } from '$stores/store_helpers';
import { extractResponse } from '../vote_counts/voting_api';

export async function getPoxInfoByStacker(stxAddress: string, cycle: number) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/stacker/${stxAddress}/${cycle}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function getRewardSlotsByCycle(cycle: number) {
	const path = `${getConfig().VITE_BRIDGE_API}/reward-slots/v1/reward-slots/${cycle}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}
export async function getPoxEntriesByCycle(cycle: number): Promise<Array<PoxEntry>> {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/pox-entries/${cycle}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function syncPoxEntriesByCycle(cycle: number): Promise<Array<PoxEntry>> {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/sync/pox-entries/${cycle}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function syncStackerEvents(poxContractName: string): Promise<Array<PoxEntry>> {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-events/v1/sync/stacker-events/${poxContractName}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res;
}

export async function findPoxEntriesByCycle(cycle: number): Promise<Array<PoxEntry>> {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/pox-entries/${cycle}`;
	const response = await fetch(path);
	const res = (await extractResponse(response)) as Array<PoxEntry>;
	return res || ([] as Array<PoxEntry>);
}

export async function findPoxEntriesByAddress(bitcoinAddress: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/pox-entries/${bitcoinAddress}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function findPoxEntriesByAddressAndCycle(bitcoinAddress: string, cycle: number) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/pox-entries/${bitcoinAddress}/${cycle}`;
	const response = await fetch(path);
	const res = await extractResponse(response);
	return res || [];
}

export async function findStackerEventsByAddress(address: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/stacker-events/v1/stacker-events-by-stacker/pox-4/${address}`;
	const response = await fetch(path);
	return await response.json();
}

export async function findPoolStackerEventsByDelegator(stacksAddress: string) {
	const path = `${getConfig().VITE_BRIDGE_API}/pox/v1/stacker-events-by-delegator/${stacksAddress}`;
	const response = await fetch(path);
	return await response.json();
}

export async function getTotalStackedInCycle(voter: string, cycle1: number) {
	const poxEntries: Array<any> = await findPoxEntriesByAddressAndCycle(voter, cycle1);
	let totalUstx = 0;
	for (const entry of poxEntries) {
		totalUstx += entry.totalUstx;
	}
	return totalUstx;
}
