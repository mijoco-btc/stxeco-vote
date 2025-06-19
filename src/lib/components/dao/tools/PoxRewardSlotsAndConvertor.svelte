<script lang="ts">
	import { fmtMicroToStx, fmtNumber, truncate, truncateEnd } from '$lib/utils';
	import { getConfig } from '$stores/store_helpers';
	import { sessionStore } from '$stores/stores';
	import { fetchBlockAtHeight } from '@mijoco/btc_helpers/dist/index';
	import type { PoxCycleInfo, PoxInfo } from '@mijoco/stx_helpers/dist/pox_types';
	import { getPoxCycleInfoRelative } from '@mijoco/stx_helpers/dist/pox/index';
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, Icon } from 'svelte-hero-icons';
	import { page } from '$app/stores';
	import type { PoxEntry } from '@mijoco/stx_helpers/dist';
	import { findPoxEntriesByCycle, syncPoxEntriesByCycle, syncStackerEvents } from '$lib/components/pox/pox_api';
	import { dynamicSort } from '$lib/components/vote_counts/voting_api';
	import { isCoordinator } from '$lib/stacks/stacks-connect';

	export let poxInfo: PoxInfo;
	export let cycle: number;

	let poxData: Array<PoxEntry> = [];
	let sortDir = '';
	let sortField = 'index';

	let currentBurnHeight: number = $sessionStore.stacksInfo.burn_block_height;
	let currentBlock: any;
	let poxInfoCycle: PoxCycleInfo;
	let componentKey = 0;

	let newCycle: number = cycle;

	const fetchCycle = async () => {
		poxData = [];
		$page.url.searchParams.set('cycle', '' + newCycle);
		history.pushState({}, '', $page.url);
		poxInfoCycle = await getPoxCycleInfoRelative(getConfig().VITE_STACKS_API, getConfig().VITE_MEMPOOL_API, getConfig().VITE_POX_CONTRACT_ID, newCycle, currentBurnHeight);
		//poxData = await poxEntries(newCycle);
	};

	const reorder = (sf: string) => {
		sortField = sf;
		sortDir = sortDir === '-' ? '' : '-';
		componentKey++;
	};

	const readPoxEntries = async () => {
		const entries = await syncPoxEntriesByCycle(newCycle);
	};

	const readStackerEventsEvents = async (poxContractName: string) => {
		syncStackerEvents(poxContractName);
	};

	const fetchNext = async () => {
		newCycle++;
		await fetchCycle();
	};

	const fetchPrevious = async () => {
		newCycle--;
		await fetchCycle();
	};

	const poxEntries = async (cycle: number) => {
		return await findPoxEntriesByCycle(cycle);
	};

	$: sortedEvents = poxData.sort(dynamicSort(sortDir + sortField));

	onMount(async () => {
		poxData = [];
		cycle = cycle > 0 ? cycle : poxInfo.reward_cycle_id;
		newCycle = cycle;
		currentBlock = await fetchBlockAtHeight(getConfig().VITE_MEMPOOL_API, $sessionStore.stacksInfo.burn_block_height);
		await fetchCycle();
		//poxData = await poxEntries(cycle);
	});
</script>

<div class="my-5 rounded-md p-3">
	<div class="row">
		<div class="text-gray-900">
			<div class="my-4 flex w-full flex-col justify-start">
				<label for="token-name" class="w-auto">Current cycle: {cycle}, current block height: {fmtNumber(currentBurnHeight)}</label>
				<div class="my-4 flex w-1/2 justify-start">
					<div class="me-2 flex grow flex-col">
						<div class="me-2 flex">
							<input id="token-name" class=" w-full rounded-lg border-gray-800 bg-sand-300 p-2 text-black" bind:value={newCycle} type="text" aria-describedby="tokenName" />
							<button
								on:click={() => {
									fetchCycle();
								}}
								class="bg-success-01 border-success-600 focus-visible:outline-primary-500/50 ms-3 w-auto items-start justify-start gap-x-1.5 rounded-xl border bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								go
							</button>
						</div>
						<div class=" my-2 flex justify-start gap-x-5">
							<div>
								<button
									on:click={() => {
										fetchPrevious();
									}}
									class=" text-white"
								>
									<Icon src={ArrowLeft} width={20} height={20} class="text-black " />
								</button>
							</div>
							<div>
								<button
									on:click={() => {
										fetchNext();
									}}
									class=" text-white"
								>
									<Icon src={ArrowRight} width={20} height={20} class="text-black " />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-4">
				<h1 class="text-2xl">Cycle information</h1>
			</div>

			{#if cycle === newCycle}
				<div class="my-4 flex w-full flex-col justify-start"></div>
			{:else if cycle - newCycle < 0}
				<div class="my-4 flex w-full flex-col justify-start">
					Cycle {newCycle}: {newCycle - cycle} cycles in the future
				</div>
			{:else}
				<div class="my-4 flex w-full flex-col justify-start">
					Cycle {newCycle}: {cycle - newCycle} cycles in the past
				</div>
			{/if}

			{#if poxInfoCycle}
				<div class="my-4 flex w-full justify-start">
					<div class="w-1/4">Cycle starts: {fmtNumber(poxInfoCycle.firstBlockHeight)}</div>
					<div class="w-1/2">~ {new Date(poxInfoCycle.firstBlockTime)}</div>
				</div>
				<div class="my-4 flex w-full justify-start">
					<div class="w-1/4">Cycle ends:&nbsp;&nbsp; {fmtNumber(poxInfoCycle.lastBlockHeight)}</div>
					<div class="w-1/2">~ {new Date(poxInfoCycle.lastBlockTime)}</div>
				</div>

				{#if isCoordinator($sessionStore.keySets[getConfig().VITE_NETWORK].stxAddress)}
					<div class="my-4 flex w-full justify-start">
						<div class="w-1/4">
							<a href="/" on:click|preventDefault={() => readPoxEntries()}>Sync pox entries for cycle {newCycle}</a>
						</div>
					</div>
					<div class="my-4 flex w-full justify-start">
						<div class="w-1/4">
							<a href="/" on:click|preventDefault={() => readStackerEventsEvents('pox-4')}>Sync pox-4 stacker events</a>
						</div>
					</div>
					<div class="my-4 flex w-full justify-start">
						<div class="w-1/4">
							<a href="/" on:click|preventDefault={() => readStackerEventsEvents('pox-3')}>Sync pox-3 stacker events</a>
						</div>
					</div>
				{/if}

				<!-- {#if poxData}
					<div class="mb-3 grid grid-cols-2 border-b border-bloodorange text-lg font-bold md:grid-cols-3">
						<div class="col-span-1">
							<a href="/" class="pointer" on:click|preventDefault={() => reorder('index')}>Entry</a>
						</div>
						<div class="hidden md:col-span-1 md:block">Stacker</div>
						<div class="col-span-1">
							<a href="/" class="pointer" on:click|preventDefault={() => reorder('totalUstx')}>Power</a>
						</div>
					</div>

					<div class="grid grid-cols-2 text-lg font-bold md:grid-cols-3">
						{#each sortedEvents as entry}
							<div class="col-span-1">
								<span class="inline-block w-[35px]">{entry.index})</span><span class="">{truncateEnd(entry.bitcoinAddr, 10)}</span>
							</div>
							<div class="hidden md:col-span-1 md:block">
								{entry.stacker ? truncateEnd(entry.stacker, 10) : '-'}
							</div>
							<div class="col-span-1">{fmtNumber(Number(fmtMicroToStx(entry.totalUstx)))}</div>
						{/each}
					</div>
				{:else}
					<p>Loading...</p>
				{/if} -->
			{/if}
		</div>
	</div>
</div>
