<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import SoloResultsRow from './SoloResultsRow.svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { csvMaker } from '$lib/utils';
	import type { ResultsSummary, VoteEvent, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { dynamicSort, findSoloVotes } from '../../voting_api';
	import VoteResultsRow from '../../VoteResultsRow.svelte';
	import AddressLookup from '../../AddressLookup.svelte';
	import { getStxAddress } from '$lib/stacks/stacks-connect';

	export let proposal: VotingEventProposeProposal;
	export let soloSummary: any;

	let votes: Array<VoteEvent> = [];
	let allVotes: Array<VoteEvent> = [];
	let includeZeros = false;
	let showVotes = false;
	let showAddressLookup = false;
	let componentKey = 0;
	let sortDir = '';
	let sortField = 'voter';
	let accountsFor = 0;
	let accountsAgainst = 0;
	let stxFor = 0;
	let stxAgainst = 0;
	let stxForUnnested = 0;
	let stxAgainstUnnested = 0;
	let stxPower = 0;
	let stxPowerNested = 0;

	let inited = false;
	let inFavour = 0;
	let winning = 'danger';

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
		csvMaker(csvVotes, 'nakamoto-solo-votes.csv');
	};

	const reorder = (sf: string) => {
		sortField = sf;
		sortDir = sortDir === '-' ? '' : '-';
		componentKey++;
	};

	const fetchTransactions = async () => {
		showAddressLookup = false;
		if (showVotes) {
			showVotes = false;
			return;
		}
		if (votes.length === 0) {
			allVotes = (await findSoloVotes(proposal.proposal)).soloVotes || [];
			//if (newV) votes = newV.soloVotes.filter((o:VoteEvent) => o.amount > 0)
			if (includeZeros) {
				votes = allVotes;
			} else {
				votes = allVotes?.filter((o: VoteEvent) => o.amount > 0) || [];
			}
		}
		showVotes = true;
	};

	const analysisMode = () => {
		includeZeros = !includeZeros;
		if (allVotes.length > 0)
			if (includeZeros) {
				votes = allVotes;
			} else {
				votes = allVotes?.filter((o: VoteEvent) => o.amount > 0) || [];
			}
		let votesFor = soloSummary.votesFor;
		let votesAgn = soloSummary.votesAgn;
		//if (includeZeros) {
		//  votesFor = summary.summaryWithZeros.find((o:any) => o._id.event === 'solo-vote' && o._id.for)
		//  votesAgn = summary.summaryWithZeros.find((o:any) => o._id.event === 'solo-vote' && !o._id.for)
		//}
		stxFor = votesFor?.total || 0;
		stxAgainst = votesAgn?.total || 0;
		stxForUnnested = votesFor?.total || 0;
		stxAgainstUnnested = votesAgn?.total || 0;
		stxPower = stxForUnnested + stxAgainstUnnested;
		stxPowerNested = stxFor + stxAgainst;
		accountsFor = votesFor?.count || 0;
		accountsAgainst = votesAgn?.count || 0;
		inFavour =
			proposal?.proposalData && proposal.proposalData.votesFor + proposal.proposalData.votesAgainst > 0 ? Number(((proposal.proposalData.votesFor / (proposal.proposalData.votesFor + proposal.proposalData.votesAgainst)) * 100).toFixed(2)) : 0;
		if (inFavour > 80) {
			winning = 'success';
		}
		componentKey++;
	};

	onMount(async () => {
		includeZeros = true; // double negative here!
		analysisMode();
		inited = true;
	});

	$: sortedEvents = votes.sort(dynamicSort(sortDir + sortField));
</script>

{#if inited}
	<VoteResultsRow {stxFor} {stxAgainst} {accountsFor} {accountsAgainst} />

	<Tooltip class="z-20 w-auto !bg-black !font-extralight" triggeredBy="#analysis-label">Toggle between all votes and eligible votes - some pool and solo votes were submitted by non-stackers.</Tooltip>

	<!--
<div class="flex justify-between">
  <a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => fetchTransactions() }>{#if !showVotes}Show{:else}Hide{/if} transaction details</a>
  <div class="flex gap-x-1 me-10">
    {#if isCoordinator(getStxAddress())}
    <a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => analysisMode() }>
      <Icon src="{InformationCircle}" mini class="ml-2 shrink-0 h-8 w-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" aria-hidden="true" id="analysis-label" />
    </a>
    {/if}
    <a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => openAddressLookup() }>
      <Icon src="{MagnifyingGlassCircle}" mini class="ml-2 shrink-0 h-8 w-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50" aria-hidden="true" id="search-label" />
    </a>
  </div>
</div>
    -->

	{#if showVotes}
		<div class="mb-3 mt-6 grid w-full grid-cols-6 justify-evenly border-b border-gray-300 pb-3">
			<div class="col-span-2"><a href="/" class="pointer w-1/2" on:click|preventDefault={() => reorder('voter')}>Voter</a></div>
			<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('amount')}>Power</a></div>
			<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('burnBlockHeight')}>Height</a></div>
			<div><a href="/" class="pointer" on:click|preventDefault={() => reorder('for')}>For/Against</a></div>
			<div>
				<a href="/" class={'text-lg text-gray-400'} on:click|preventDefault={() => download()}>to csv</a>
			</div>
		</div>
		{#key componentKey}
			{#each sortedEvents as item}
				<SoloResultsRow {item} />
			{/each}
		{/key}
	{/if}
	{#if showAddressLookup}
		<AddressLookup lookupMode={true} walletAddress={getStxAddress()} />
	{/if}
{/if}
