<script lang="ts">
	import { sessionStore } from '$stores/stores';
	import { onMount } from 'svelte';
	import { ArrowUpRight, Icon } from 'svelte-hero-icons';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { dynamicSort } from '../voting_api';
	import { explorerBtcTxUrl, explorerTxUrl } from '$lib/stacks/stacks-connect';
	import { fmtMicroToStx, fmtNumberStacksFloor } from '$lib/utils';

	export let votes: Array<VoteEvent> = [];
	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];
	let componentKey = 0;
	let sortDir = '';
	let sortField = 'voter';

	const getAmountLocked = (vote: VoteEvent): number => {
		return vote.amountLocked;
	};

	const reorder = (sf: string) => {
		sortField = sf;
		sortDir = sortDir === '-' ? '' : '-';
		componentKey++;
	};

	onMount(async () => {});

	$: sortedEvents = votes.sort(dynamicSort(sortDir + sortField));
</script>

<div class="mb-3 mt-5 grid w-full grid-cols-6 justify-evenly border-b border-gray-300 pb-3">
	<div class="col-span-3">
		<a href="/" class="pointer w-1/2" on:click|preventDefault={() => reorder('voter')}>Voter</a>
	</div>
	<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('amount')}>Total</a></div>
	<div>
		<a href="/" class="pointer" on:click|preventDefault={() => reorder('amountLocked')}>Locked</a>
	</div>
	<div>
		<a href="/" class="pointer" on:click|preventDefault={() => reorder('for')}>For/Against</a>
	</div>
</div>
{#each sortedEvents as item}
	<div class="grid w-full grid-cols-6 justify-evenly">
		<div class={item.voter === account.stxAddress ? 'col-span-3 w-full break-words text-success' : 'col-span-3 break-words'} title={item.voter === account.stxAddress ? 'I voted!' : ''}>
			<span class="">
				<a
					title="Show in Explorer"
					href={item.source === 'bitcoin' ? explorerBtcTxUrl(item.submitTxId) : explorerTxUrl(item.submitTxId)}
					target="_blank"
					class="focus-visible:outline-primary-500/50 relative top-[5px] inline-flex h-4 w-4 items-center justify-center rounded-md border border-transparent bg-black transition duration-200 hover:border-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<Icon src={ArrowUpRight} mini class="h-5 w-5 text-white backdrop:inline-block" aria-hidden="true" />
				</a>
				<span class="pe-5">{item.voter}</span>
			</span>
		</div>
		{#if item.amount < 1000000}
			<div class="break-words">{fmtMicroToStx(item.amount)}</div>
		{:else}
			<div class="break-words">{@html fmtMicroToStx(item.amount)}</div>
		{/if}
		<div class="break-words">{@html fmtNumberStacksFloor(getAmountLocked(item))}</div>
		<div class="py-2">
			{@html item.for ? '<span class="bg-success-300 text-success-800 py-2 px-3  border-success-500 rounded-2xl">Yes</span>' : '<span class="bg-danger-300 text-danger-100 py-2 px-3  border-danger-500 rounded-2xl">No</span>'}
		</div>
	</div>
{/each}
