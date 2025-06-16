<script lang="ts">
	import { sessionStore } from '$stores/stores';
	import { onMount } from 'svelte';
	import { ArrowUpRight, Icon } from 'svelte-hero-icons';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { csvMaker } from '$lib/utils';
	import { dynamicSort, fromOnChainAmount } from './voting_api';
	import { explorerTxUrl } from '$lib/stacks/stacks-connect';

	export let votes: Array<VoteEvent> = [];
	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];
	let componentKey = 0;
	let sortDir = '';
	let sortField = 'voter';

	const download = () => {
		const csvVotes = [];
		for (const vote of votes) {
			csvVotes.push({
				voter: vote.voter,
				txid: vote.submitTxId,
				for: vote.for,
				power: vote.amount
			});
		}
		csvMaker(csvVotes, 'nakamoto-dao-votes.csv');
	};

	const getAmount = (vote: VoteEvent): number => {
		if (vote.event === 'pool-event') {
			if (vote.stackerData && vote.stackerData.length > 0) {
				return vote.stackerData[0].data.amountUstx;
			} else return 0;
		} else {
			return vote.amount;
		}
	};

	const reorder = (sf: string) => {
		sortField = sf;
		sortDir = sortDir === '-' ? '' : '-';
		componentKey++;
	};

	onMount(async () => {});

	$: sortedEvents = votes.sort(dynamicSort(sortDir + sortField));
</script>

<div>
	<a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => download()}>to csv</a>
</div>

<div class="mb-3 mt-5 grid w-full grid-cols-4 justify-evenly border-b border-gray-300 pb-3">
	<div class="col-span-2"><a href="/" class="pointer w-1/2" on:click|preventDefault={() => reorder('voter')}>Voter</a></div>
	<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('amount')}>Power</a></div>
	<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('for')}>For/Against</a></div>
</div>
{#each sortedEvents as item}
	{#if getAmount(item) > 0}
		<div class="grid w-full grid-cols-4 justify-evenly">
			<div class={item.voter === account.stxAddress ? 'col-span-2 w-full break-words text-success' : 'col-span-2 break-words'} title={item.voter === account.stxAddress ? 'I voted!' : ''}>
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
			<div class="break-words">{@html fromOnChainAmount(getAmount(item))}</div>
			<div class="py-2">{@html item.for ? '<span class="bg-success-300 text-success-800 py-2 px-3  border-success-500 rounded-2xl">Yes</span>' : '<span class="bg-danger-300 text-danger-100 py-2 px-3  border-danger-500 rounded-2xl">No</span>'}</div>
		</div>
	{/if}
{/each}
