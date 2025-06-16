<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import VoteResults2Table from './VoteResults2Table.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { csvMaker } from '$lib/utils';
	import type { VoteEvent, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { dynamicSort } from '../voting_api';
	import AddressLookup from '../AddressLookup.svelte';
	import { getStxAddress } from '$lib/stacks/stacks-connect';

	export let proposal: VotingEventProposeProposal;
	export let bitcoinVotes: Array<VoteEvent> = [];
	export let stacksVotes: Array<VoteEvent> = [];

	let votes: Array<VoteEvent> = [];
	let allVotes: Array<VoteEvent> = [];

	let includeZeros = false;
	let showVotes = false;
	let showAddressLookup = false;
	let componentKey = 0;
	let sortDir = '';
	let sortField = 'voter';
	let inited = false;

	const download = () => {
		const csvVotes = [];
		for (const vote of votes) {
			csvVotes.push({
				voter: vote.voter,
				txid: vote.submitTxId,
				for: vote.for,
				total: vote.amount,
				locked: vote.amountLocked
			});
		}
		csvMaker(csvVotes, proposal?.proposalMeta?.title || 'voting-results');
	};

	const reorder = (sf: string) => {
		sortField = sf;
		sortDir = sortDir === '-' ? '' : '-';
		componentKey++;
	};

	const openAddressLookup = () => {
		showAddressLookup = !showAddressLookup;
		showVotes = false;
	};

	const toggleVotes = async () => {
		showVotes = !showVotes;
	};

	const filterVotes = async () => {
		if (includeZeros) {
			votes = allVotes;
		} else {
			votes = allVotes?.filter((o: VoteEvent) => o.amount > 0) || [];
		}
		showVotes = true;
	};

	onMount(async () => {
		includeZeros = true; // double negative here!
		votes = bitcoinVotes.concat(stacksVotes);
		if (proposal) inited = true;
	});

	$: sortedEvents = votes.sort(dynamicSort(sortDir + sortField));
</script>

{#if inited}
	<Tooltip class="z-20 w-auto !bg-black !font-extralight" triggeredBy="#analysis-label">Toggle between all votes and eligible votes - some pool and solo votes were submitted by non-stackers.</Tooltip>

	<div class="flex justify-between">
		<a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => toggleVotes()}
			>{#if !showVotes}Show{:else}Hide{/if} transaction details</a
		>
		<div class="me-10 flex gap-x-1">
			<div>
				<a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => download()}>to csv</a>
			</div>
		</div>
	</div>

	{#if showVotes}
		{#key componentKey}
			<VoteResults2Table {votes} />
		{/key}
	{/if}
	{#if showAddressLookup}
		<AddressLookup lookupMode={true} walletAddress={getStxAddress()} />
	{/if}
{/if}
