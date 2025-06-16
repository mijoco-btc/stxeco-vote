<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { getBalanceAtHeight } from '@mijoco/stx_helpers/dist/custom-node';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { fmtNumber, fromMicroAmount } from '$lib/utils';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/dao';
	import { getCurrentProposalLink, getProposalLatest, getProposalNotFoundLink, isPostVoting, isVoting } from '$lib/components/proposals/proposals';
	import { findPoolVotes, findSoloVotes } from '$lib/components/vote_counts/voting_api';
	import ProposalHeader from '$lib/components/proposals/ProposalHeader.svelte';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/components/ui/NakamotoShield.svelte';
	import VoteResults2Overview from '$lib/components/vote_counts/results2/VoteResults2Overview.svelte';
	import VoteResults2 from '$lib/components/vote_counts/results2/VoteResults2.svelte';
	import HoldingResults from '$lib/components/vote_counts/HoldingResults.svelte';
	import Placeholder from '$lib/components/ui/Placeholder.svelte';
	import { page } from '$app/state';
	import { getStxAddress } from '$lib/stacks/stacks-connect';

	let proposal: VotingEventProposeProposal | undefined;

	let bitcoinVotes: Array<VoteEvent> = [];
	let stacksVotes: Array<VoteEvent> = [];
	let uniqueAccounts: number = 0;
	let method: number = -1;
	let errorReason: string | undefined;
	let balanceAtHeight: number = 0;
	let inited = false;

	let bSumFor: number;
	let bSumAg: number;
	let sSumFor: number;
	let sSumAg: number;

	const voteConcluded = () => {
		if (!proposal || !proposal.proposalData) return false;
		return isPostVoting(proposal);
	};

	onMount(async () => {
		method = 1; //Number($page.url.searchParams.get('method')) || 3
		proposal = await getProposalLatest(page.params.contractId);
		const bitcoin = await findSoloVotes(proposal.proposal);
		const stacks = await findPoolVotes(proposal.proposal);
		bitcoinVotes = bitcoin?.soloVotes.filter((o: any) => o.amount > 0);
		stacksVotes = stacks?.poolVotes.filter((o: any) => o.amount > 0);

		uniqueAccounts = (bitcoinVotes?.length || 0) + (stacksVotes?.length || 0);
		bSumFor = bitcoinVotes.filter((o) => o.for).length;
		bSumAg = bitcoinVotes.filter((o) => !o.for).length;
		sSumFor = stacksVotes.filter((o) => o.for && o.amount > 0).length;
		sSumAg = stacksVotes.filter((o) => !o.for && o.amount > 0).length;

		if (proposal) {
			try {
				const response = await getBalanceAtHeight(getConfig().VITE_STACKS_API, getStxAddress(), proposal.proposalData.startBlockHeight);
				balanceAtHeight = fromMicroAmount(Number(response.stx.balance) - Number(response.stx.locked));
			} catch (e: any) {
				balanceAtHeight = $sessionStore.keySets[getConfig().VITE_NETWORK].walletBalances?.stacks.amount || 0;
				errorReason = e.message;
			}
		}
		inited = true;
	});
</script>

<svelte:head>
	<title>Ecosystem DAO - SIP Voting</title>
	<meta name="description" content="Stacks Improvement Proposals - governance of the Stacks Blockchain." />
</svelte:head>

<div class="mx-auto max-w-7xl py-6 md:px-6">
	{#if proposal && inited}
		<ProposalHeader {proposal} />
		{#if voteConcluded() || isVoting(proposal)}
			<div class="my-8 flex w-full flex-col">
				<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
					<div class="flex flex-col items-stretch justify-items-stretch">
						<div>
							{#if !isVoting(proposal)}
								<div class="mb-3 max-w-md">
									<h2 class="mb-3 text-2xl text-[#131416]">Voting over</h2>
									<p>Voting closed at block {fmtNumber(proposal.proposalData.burnEndHeight)}</p>
									<p>{uniqueAccounts} addresses voted</p>
									<p class="mt-5">Detailed results are displayed below</p>
								</div>
							{:else}
								<div class="mb-3 max-w-md">
									<h2 class="mb-3 text-2xl text-[#131416]">Voting in progress</h2>
									<p>Voting closes at block {fmtNumber(proposal.proposalData.burnEndHeight)}</p>
									<p>
										{uniqueAccounts} addresses voting with {bSumFor + bSumAg} bitcoin and {sSumFor + sSumAg} stacks transactions
									</p>
									<p class="mt-5">Detailed results are displayed below</p>
								</div>
							{/if}
						</div>
					</div>
					<NakamotoBackground />
					<NakamotoShield />
				</div>
			</div>

			<div id="tabs-header">
				<VoteResults2Overview {proposal} {bitcoinVotes} {stacksVotes} />
			</div>
			<div>
				<!-- {#if isCoordinator(getStxAddress())} -->
				<div class="bg-lightgray px-4 py-8">
					<VoteResults2 {proposal} {bitcoinVotes} {stacksVotes} />
				</div>
				<!-- {/if} -->
			</div>
		{:else}
			<HoldingResults />
		{/if}
	{:else if !proposal}
		<Placeholder message={'Proposal could not be loaded'} link={getProposalNotFoundLink()} />
	{:else}
		<Placeholder message={'Vote info loading'} link={getCurrentProposalLink(page.params.contractId)} />
	{/if}
</div>
