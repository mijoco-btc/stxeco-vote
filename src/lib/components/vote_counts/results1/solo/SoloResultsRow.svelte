<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { getHashBytesFromAddress } from '@mijoco/btc_helpers/dist/index';
	import { fmtMicroToStx, fmtNumber, truncate } from '$lib/utils';
	import { findPoolStackerEventsByHashBytes, findStackerEventsByEventAndAddress, fromOnChainAmount, NAKAMOTO_VOTE_START_HEIGHT, NAKAMOTO_VOTE_STOPS_HEIGHT } from '../../voting_api';
	import { findPoolStackerEventsByDelegator, findPoxEntriesByAddressAndCycle } from '$lib/components/pox/pox_api';
	import { explorerBtcTxUrl, getStxAddress, isCoordinator } from '$lib/stacks/stacks-connect';

	export let item: VoteEvent;
	let expanded = false;
	let inited = false;
	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];
	let entries: Array<any>;
	let events: Array<any>;

	const getAmount = () => {
		try {
			return item.amount ? fmtNumber(Math.floor(Number(fmtMicroToStx(item.amount)))) : 0; //ChainUtils.fromOnChainAmount(item.amount)
		} catch (err: any) {
			return 0;
		}
	};

	const checkBlockHeight = () => {
		return item.burnBlockHeight >= NAKAMOTO_VOTE_START_HEIGHT && item.burnBlockHeight < NAKAMOTO_VOTE_STOPS_HEIGHT;
	};

	const fetchPoxData = async () => {
		if (expanded) {
			expanded = false;
			return;
		}
		entries = await findPoxEntriesByAddressAndCycle(item.voterProxy ? item.voterProxy : item.voter, 78);
		entries = entries.concat(await findPoxEntriesByAddressAndCycle(item.voterProxy ? item.voterProxy : item.voter, 79));
		const poxAddr = getHashBytesFromAddress(getConfig().VITE_NETWORK, item.voter);
		if (poxAddr && poxAddr.hashBytes) {
			events = await findPoolStackerEventsByHashBytes(poxAddr.hashBytes, 0, 20);
			if (item.poxStacker) {
				events = events.concat(await findPoolStackerEventsByDelegator(item.poxStacker));
				events = events.concat(await findStackerEventsByEventAndAddress('stack-stx', item.poxStacker));
			}
		}

		expanded = true;
	};

	onMount(async () => {
		inited = true;
	});
</script>

{#if inited}
	<div class="mb-[-5px] grid w-full grid-cols-6 justify-evenly text-sm">
		<div class={item.voter === account.stxAddress ? 'col-span-2 w-1/2 break-words text-success' : 'col-span-2 break-words'} title={item.voter === account.stxAddress ? 'I voted!' : ''}>
			<a title="Show in Explorer" href={explorerBtcTxUrl(item.submitTxId)} target="_blank" class="">
				{#if isCoordinator(getStxAddress())}{item.voter}{:else}{truncate(item.voter)}{/if}
			</a>
		</div>
		<div class="">{getAmount()}</div>
		<div class={checkBlockHeight() ? 'text-base' : 'text-danger-500'}>
			{fmtNumber(item.burnBlockHeight)}
		</div>
		<div class="py-1">
			{@html item.for ? '<span class="bg-success-300 text-success-800 py-2 px-3  border-success-500 rounded-2xl">Yes</span>' : '<span class="bg-danger-300 text-danger-100 py-2 px-3  border-danger-500 rounded-2xl">No</span>'}
		</div>
		<div class="w-full justify-end text-[#131416]/[0.64]">
			{#if isCoordinator(getStxAddress())}<a href="/" on:click|preventDefault={() => fetchPoxData()} target="_blank">more</a>{/if}
		</div>
	</div>
	{#if isCoordinator(account.stxAddress)}
		<div class="mb-4 grid w-full grid-cols-6 justify-evenly text-sm">
			<div class="col-span-6 text-[#131416]/[0.44]">
				{#if item.voterProxy}<span title="nested voting address">Nested address: {item.voterProxy}</span>{/if}
				{#if item.poxStacker}<span title="nested stacker address">Stacker: {item.poxStacker}</span>{/if}
				{#if item.stackerData}<span title="nested stacker address">Data: {item.stackerData}</span>{/if}
			</div>
		</div>
	{/if}

	{#if expanded && entries}
		<div class="mb-4 mt-0 border-b pt-0 text-[#131416]/[0.44]">
			<p>Entries from pox reward data map for cycles 78 and 79</p>
			{#each entries as entry}
				<div class="grid w-full grid-cols-6 justify-evenly text-xs">
					<div class="col-span-2 break-words">
						<a href={'/dashboard/address-lookup/' + entry.stacker} target="_blank">{entry.stacker}</a>
					</div>
					<div class="">
						Stacked: {fmtNumber(Math.floor(Number(fmtMicroToStx(entry.totalUstx))))}
					</div>
					<div class="col-span-1">Cycle: {entry.cycle}</div>
					<div class="col-span-1">Index: {entry.index}</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if expanded && events}
		<div class="mb-4 mt-0 border-b pt-0 text-[#131416]/[0.44]">
			<p>Entries from pox-3 event stream</p>
			{#each events as entry}
				<div class="grid w-full grid-cols-6 justify-evenly text-xs">
					<div class="col-span-2 break-words">
						<a href={'/dashboard/address-lookup/' + entry.stacker} target="_blank">{entry.stacker}</a>
					</div>
					<div class="">Bal.: {@html fromOnChainAmount(entry.balance)}</div>
					<div class="col-span-1">
						lockAmount: {fmtNumber(Math.floor(Number(fmtMicroToStx(entry.data.lockAmount))))}
					</div>
					<div class="col-span-1">event: {entry.event}</div>
				</div>
			{/each}
		</div>
	{/if}
{/if}
