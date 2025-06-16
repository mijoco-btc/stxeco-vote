<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { ArrowUpRight, Icon } from 'svelte-hero-icons';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { fmtNumber, truncate } from '$lib/utils';
	import { getAddressFromHashBytes } from '@mijoco/btc_helpers/dist/index';
	import { explorerTxUrl, isCoordinator } from '$lib/stacks/stacks-connect';
	import { findStackerEventsByEventAndAddress, fromOnChainAmount } from '../../voting_api';

	export let item: VoteEvent;

	let expanded = false;
	let inited = false;
	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];
	let coordinator = isCoordinator(account.stxAddress);
	let events: Array<any>;

	const checkBlockHeight = () => {
		if (!item.burnBlockHeight) return true;
		return true; //item.burnBlockHeight >= NAKAMOTO_VOTE_START_HEIGHT && item.burnBlockHeight < NAKAMOTO_VOTE_STOPS_HEIGHT
	};

	const getAmount = (entry: any) => {
		if (entry.event === 'delegate-stx') {
			return 'Amount: ' + fromOnChainAmount(entry.data.amountUstx);
		} else if (entry.event === 'delegate-stack-stx') {
			return 'Lock: ' + fromOnChainAmount(entry.data.lockAmount);
		} else if (entry.event === 'delegate-stack-extend') {
			return 'Extend: ' + entry.data.extendCount;
		} else {
			return '-';
		}
	};

	const getUnlockHeight = (entry: any) => {
		if (entry.data.unlockBurnHeight === 0) {
			return 'indefinite';
		}
		if (entry.event === 'delegate-stx') {
			return fmtNumber(entry.data.unlockBurnHeight);
		} else if (entry.event === 'delegate-stack-stx') {
			return fmtNumber(entry.data.unlockBurnHeight);
		} else if (entry.event === 'delegate-stack-extend') {
			return fmtNumber(entry.data.unlockBurnHeight);
		} else {
			return '-';
		}
	};

	const getDelegator = (entry: any) => {
		if (entry.data.delegator) {
			return truncate(entry.data.delegator, 10);
		} else {
			return '-';
		}
	};

	const getRewardAddress = (entry: any) => {
		try {
			return truncate(getAddressFromHashBytes(getConfig().VITE_NETWORK, entry.data.poxAddr.hashBytes, entry.data.poxAddr.version), 10);
		} catch (err: any) {
			return '-';
		}
	};

	const fetchPoxData = async () => {
		if (expanded) {
			expanded = false;
			return;
		}
		events = await findStackerEventsByEventAndAddress('stack-stx', item.voter);
		expanded = true;
	};

	onMount(async () => {
		inited = true;
	});
</script>

{#if inited}
	<div class="grid w-full grid-cols-6 justify-evenly text-sm">
		<div class={item.voter === account.stxAddress ? 'col-span-2 w-1/2 break-words text-success' : 'col-span-2 break-words'} title={item.voter === account.stxAddress ? 'I voted!' : ''}>
			<span class="">
				<span class="pe-5">{item.voter}</span>
				<a
					title="Show in Explorer"
					href={explorerTxUrl(item.submitTxId)}
					target="_blank"
					class=" focus-visible:outline-primary-500/50 inline-flex h-4 w-4 items-center justify-center rounded-md border border-transparent bg-black transition duration-200 hover:border-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<Icon src={ArrowUpRight} mini class="inline-block h-5 w-5 text-white" aria-hidden="true" />
				</a>
			</span>
		</div>
		<div class="">{@html fromOnChainAmount(item.amount)}</div>
		<div class={checkBlockHeight() ? 'text-base' : 'text-danger-500'}>
			{fmtNumber(item.burnBlockHeight || 0)}
		</div>
		<div class="py-1">
			{@html item.for ? '<span class="bg-success-300 text-success-800 py-2 px-3  border-success-500 rounded-2xl">Yes</span>' : '<span class="bg-danger-300 text-danger-100 py-2 px-3  border-danger-500 rounded-2xl">No</span>'}
		</div>
		<div class="w-full justify-end text-[#131416]/[0.64]">
			{#if coordinator}<a href={'/dashboard/address-lookup/' + item.voter} target="_blank">more</a>{/if}
		</div>
	</div>

	{#if expanded && events}
		<div class="mb-4 mt-0 border-b pt-0 text-[#131416]/[0.44]">
			<p>Entries from pox-3 event stream</p>
			{#each events as entry}
				<div class="grid w-full grid-cols-7 justify-evenly text-xs">
					<div class="col-span-2 break-words">
						{#if coordinator}<a href={'/dashboard/address-lookup/' + entry.stacker} target="_blank">{entry.stacker}</a>{/if}
					</div>
					<div class="col-span-1">{entry.event}</div>
					{#if entry.event === 'delegate-stx'}
						<div class="col-span-2">
							Delegator: {#if coordinator}<a href={'/dashboard/address-lookup/' + entry.data.delegator} target="_blank">{truncate(entry.data.delegator)}</a>{/if}
						</div>
						<div class="">Amt: {entry.data.amountUstx}</div>
						<div class="">Unlck: {entry.data.unlockBurnHeight}</div>
					{:else}
						<div class=""></div>
						<div class=""></div>
						<div class=""></div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
{/if}
