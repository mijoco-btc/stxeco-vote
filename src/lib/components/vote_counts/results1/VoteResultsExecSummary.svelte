<script lang="ts">
	import NakamotoResultsBackground from '../../ui/NakamotoResultsBackground.svelte';
	import { CheckCircleSolid, XSolid } from 'flowbite-svelte-icons';
	import { sessionStore } from '$stores/stores';
	import type { ResultsSummary, StackerProposalData, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';
	import { getDaoSummary, getPoolAndSoloVotesByProposal, getSummary, NAKAMOTO_VOTE_STOPS_HEIGHT } from '../voting_api';

	export let proposal: VotingEventProposeProposal;
	let approved = true;
	let summary: ResultsSummary;
	let daoSummary: ResultsSummary;

	let poolPercent = '0';
	let soloPercent = '0';
	let daoPercent = '0';
	let daoAccountsFor = 0;
	let daoAccountsAgainst = 0;

	const blockSinceEnd = () => {
		return $sessionStore.stacksInfo?.burn_block_height - NAKAMOTO_VOTE_STOPS_HEIGHT;
	};

	const doCount = () => {
		const sd: StackerProposalData | undefined = proposal.stackerData;
		let votesFor = summary.summary.find((o) => o._id.event === 'pool-vote' && o._id.for);
		let votesAgn = summary.summary.find((o) => o._id.event === 'pool-vote' && !o._id.for);
		let stxFor = votesFor?.total || 0;
		let stxAgainst = votesAgn?.total || 0;
		let stxPower = stxFor + stxAgainst;
		if (sd && sd.reportedResults) {
			stxFor = sd.reportedResults.poolFor;
			stxAgainst = sd.reportedResults.poolAgainst;
			stxPower = stxFor + stxAgainst;
		}

		poolPercent = ((stxFor / stxPower) * 100).toFixed(4);

		votesFor = summary.summary.find((o) => o._id.event === 'solo-vote' && o._id.for);
		votesAgn = summary.summary.find((o) => o._id.event === 'solo-vote' && !o._id.for);
		stxFor = votesFor?.total || 0;
		stxAgainst = votesAgn?.total || 0;
		stxPower = stxFor + stxAgainst;
		if (sd && sd.reportedResults) {
			stxFor = sd.reportedResults.soloFor;
			stxAgainst = sd.reportedResults.soloAgainst;
			stxPower = stxFor + stxAgainst;
		}

		soloPercent = ((stxFor / stxPower) * 100).toFixed(4);

		votesFor = daoSummary.summary.find((o) => o._id.event === 'vote' && o._id.for);
		votesAgn = daoSummary.summary.find((o) => o._id.event === 'vote' && !o._id.for);
		stxFor = daoSummary.proposalData.votesFor;
		stxAgainst = daoSummary.proposalData.votesAgainst;
		stxPower = stxFor + stxAgainst;
		daoAccountsFor = votesFor?.count || 0;
		daoAccountsAgainst = votesAgn?.count || 0;
		daoPercent = ((stxFor / stxPower) * 100).toFixed(4);
	};

	onMount(async () => {
		daoSummary = await getDaoSummary(proposal.proposal);
		summary = await getSummary(proposal.proposal);
		summary.proposalData = proposal.proposalData;
		const allVotes = await getPoolAndSoloVotesByProposal(proposal.proposal);
		doCount();
	});
</script>

<div class="mb-8 space-y-4 align-top lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
	<!--
	<div class="p-8 stretch bg-[#1c671b] rounded-2xl self-start">
	  	<h3 class="text-3xl text-white font-extralight">Vote passed</h3>
	</div>
	-->
	{#if blockSinceEnd() > 0}
		<div class="bg-success-01 border-error-600 relative col-span-3 rounded-2xl bg-[#1c671b] p-8">
			{#if soloPercent !== 'NaN'}
				<div class="mb-5 flex flex-col justify-between gap-y-3 text-white md:flex-row">
					<div><span class="text-4xl font-extrabold">Solo Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{soloPercent} %</span></div>
					<div>
						{#if Number(soloPercent) >= 80}
							<CheckCircleSolid class="h-10 w-10 text-white " />
						{:else}
							<XSolid class="text-red-500 h-10 w-10" />
						{/if}
					</div>
				</div>
			{/if}

			{#if poolPercent !== 'NaN'}
				<div class="mb-5 flex flex-col justify-between gap-y-3 text-white md:flex-row">
					<div><span class="text-4xl font-extrabold">Pool Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{poolPercent} %</span></div>
					<div>
						{#if Number(poolPercent) >= 80}
							<CheckCircleSolid class="h-10 w-10 text-white " />
						{:else}
							<XSolid class="text-red-500 h-10 w-10" />
						{/if}
					</div>
				</div>
			{/if}

			{#if daoPercent !== 'NaN'}
				<div class="mb-2 flex flex-col justify-between gap-y-3 text-white md:flex-row">
					<div><span class="text-4xl font-extrabold">Non-Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{daoPercent} %</span></div>
					<div>
						{#if Number(daoPercent) >= 66}
							<CheckCircleSolid class="h-10 w-10 text-white " />
						{:else}
							<XSolid class="text-red-500 h-10 w-10" />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="border-error-600 relative col-span-2 rounded-2xl bg-[#1c671b] p-8">
			{#if approved}
				<div class="mb-5 flex justify-between">
					<div>
						<CheckCircleSolid class="h-10 w-10 text-white " />
					</div>
					<div><span class="text-4xl font-extrabold">YES</span></div>
				</div>
				<div class="flex justify-between">
					<div><span class="">Proposal failed to pass</span></div>
				</div>
			{:else}
				<div class="mb-5 flex justify-between">
					<div>
						<XSolid class="text-red-500 h-10 w-10" />
					</div>
					<div><span class="text-4xl font-semibold">NO</span></div>
				</div>
				<div class="flex flex-col">
					<div><span class="">Proposal failed to pass</span></div>
					<div><span class="">Check below for the detailed breakdown on each voting method</span></div>
				</div>
			{/if}
			<NakamotoResultsBackground />
		</div>
	{/if}
</div>
