<script lang="ts">
	import { onMount } from 'svelte';
	import { fmtMicroToStx, fmtNumber, truncate } from '$lib/utils';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/index';
	import { getAddressFromHashBytes, getHashBytesFromAddress } from '@mijoco/btc_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { findPoolStackerEventsByHashBytes, findPoxEntriesByAddress, findStackerEventsByEventAndAddress, fromOnChainAmount, getDaoVotesByVoter } from './voting_api';

	export let walletAddress: string;
	export let lookupMode: boolean;

	let votes: Array<VoteEvent>;
	let stackerEventEntries: Array<any>;
	let soloEventEntries: Array<any>;
	let poxEntries: Array<any>;
	let inited = false;

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

	const processStackingHistory = async () => {
		if (!walletAddress) return;
		votes = await getDaoVotesByVoter(walletAddress);
		if (walletAddress.startsWith('S')) {
			stackerEventEntries = await findStackerEventsByEventAndAddress('stack-stx', walletAddress);
		} else {
			poxEntries = await findPoxEntriesByAddress(walletAddress);
			const poxAddr = getHashBytesFromAddress(getConfig().VITE_NETWORK, walletAddress);
			if (poxAddr && poxAddr.hashBytes) soloEventEntries = await findPoolStackerEventsByHashBytes(poxAddr.hashBytes, 0, 20);
		}
	};

	onMount(async () => {
		//await processStackingHistory()
		inited = true;
	});
</script>

{#if inited}
	<div class="m-5 rounded-md border border-lightgray bg-white p-5">
		{#if lookupMode}
			<div class="my-8 flex w-full flex-col">
				<div class="bg-warning-01 flex flex-col gap-y-2">
					<h1 class="text-2xl">Voting data</h1>
					<input type="text" id="stacks-address" placeholder="stacks address is required" class="rounded-sm border p-3 text-black" bind:value={walletAddress} />

					<button
						on:click={() => {
							processStackingHistory();
						}}
						class="focus-visible:outline-primary-500/50 w-[150px] items-start justify-start gap-x-1.5 rounded-xl border-none bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Lookup
					</button>
				</div>
			</div>
			{#if votes && votes.length > 0}
				<div class="my-8 flex w-full flex-col">
					<div class="bg-warning-01 flex flex-col gap-y-2">
						<h1 class="text-2xl">Voting data</h1>
						<div class="mt-3 grid w-full grid-cols-3 justify-evenly border-t border-gray-300 py-3">
							<div>Type</div>
							<div>STX</div>
							<div>For</div>
						</div>
						{#each votes as vote}
							<div class="grid w-full grid-cols-3 justify-evenly text-xs">
								<div class="">{vote.event}</div>
								<div class="">
									{vote.amount ? fmtNumber(Number(fmtMicroToStx(vote.amount))) : '-'}
								</div>
								<div class="">{vote.for}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/if}
		{#if stackerEventEntries && stackerEventEntries.length > 0}
			<div class="my-8 flex w-full flex-col">
				<div class="bg-warning-01 flex flex-col gap-y-2">
					<h1 class="text-2xl">Voting data</h1>
					<div class="mt-3 grid w-full grid-cols-3 justify-evenly border-t border-gray-300 py-3">
						<div>Type</div>
						<div>STX</div>
						<div>For</div>
					</div>
					{#each stackerEventEntries as vote}
						{#if vote.event === 'stack-stx'}
							<div class="grid w-full grid-cols-3 justify-evenly text-xs">
								<div class="">{vote.event}</div>
								<div class="">{fmtNumber(Number(fmtMicroToStx(vote.data.lockAmount)))}</div>
								<div class="">{'-'}</div>
							</div>
						{:else}
							<div class="grid w-full grid-cols-3 justify-evenly text-xs">
								<div class="">{vote.event}</div>
								<div class="">
									{vote.amount ? fmtNumber(Number(fmtMicroToStx(vote.amount))) : '-'}
								</div>
								<div class="">{vote.for}</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
		{#if poxEntries}
			<div class="my-8 flex w-full flex-col">
				<div class="bg-warning-01 flex flex-col gap-y-2">
					<h1 class="text-2xl">PoX data</h1>
					<div class="mt-3 grid w-full grid-cols-6 justify-evenly border-t border-gray-300 py-3">
						<div>Event</div>
						<div>Unlock</div>
						<div>Amount/Unlock</div>
						<div>Delegator</div>
						<div>Reward Addr</div>
					</div>
					{#if poxEntries.length > 0}
						{#each poxEntries as entry}
							<div class="grid w-full grid-cols-6 justify-evenly text-xs">
								<div class="">{entry.event}</div>
								<div class="">{getUnlockHeight(entry)}</div>
								<div class="">{@html getAmount(entry)}</div>
								<div class="">{getDelegator(entry)}</div>
								<div class="">{getRewardAddress(entry)}</div>
							</div>
						{/each}
					{:else}
						<div class="bg-warning-01 flex flex-col gap-y-2">
							<h3 class="mb-2">No pox data in cycles 78/79</h3>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}
