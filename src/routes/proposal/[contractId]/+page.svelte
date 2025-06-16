<script lang="ts">
	import { onMount } from 'svelte';
	import { Skeleton } from 'flowbite-svelte';
	import { sessionStore } from '$stores/stores';
	import { page } from '$app/state';
	import { getBalanceAtHeight } from '@mijoco/stx_helpers/dist/custom-node';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { goto } from '$app/navigation';
	import { concludeVote } from '$lib/components/vote_counts/voting_api';
	import { getCurrentProposalLink, getProposalLatest, isConclusionPending, isPostVoting, isProposedPreVoting, isVoting } from '$lib/components/proposals/proposals';
	import { fromMicroAmount } from '$lib/utils';
	import { getStxAddress, isCoordinator } from '$lib/stacks/stacks-connect';
	import ProposalHeader from '$lib/components/proposals/ProposalHeader.svelte';
	import SoloVotingActive from '$lib/components/vote_counts/results1/solo/SoloVotingActive.svelte';
	import PoolVotingActive from '$lib/components/vote_counts/results1/pool/PoolVotingActive.svelte';
	import DaoVotingActive from '$lib/components/vote_counts/results1/dao-voting/DaoVotingActive.svelte';
	import Holding from '$lib/components/vote_counts/Holding.svelte';
	import Placeholder from '$lib/components/ui/Placeholder.svelte';
	import DaoConcluded from '$lib/components/vote_counts/results1/dao-voting/DaoConcluded.svelte';

	let method: number = 2;
	let proposal: VotingEventProposeProposal | undefined;
	let lockedBalanceAtHeight: number;
	let totalBalanceAtHeight: number;
	let balanceAtHeight: number = 0;
	let inited = false;

	const switchVotingMethod = (e: any) => {
		method = e.detail.method;
	};

	const conclude = async () => {
		if (proposal) {
			await concludeVote(proposal.contract.source, proposal.proposal);
		}
	};

	onMount(async () => {
		method = Number(page.url.searchParams.get('method')) || 2;
		proposal = await getProposalLatest(page.params.contractId);

		if (!proposal) goto('/');
		if (isPostVoting(proposal)) {
			const nodao = proposal.stackerData?.nodao || true;
			goto(`/proposal/${nodao ? 'results-v2' : 'results-v1'}/${proposal.proposal}?chain=mainnet`);
			return;
		}
		try {
			// note the latter is the proposal deploy height but we'd like it to the height that corresponds to the bitcoin start height.
			const startStacksBlock = proposal.stackerData?.heights?.stacksStart || proposal.proposalData.startBlockHeight;
			const stxAddress = getStxAddress();
			const response = await getBalanceAtHeight(getConfig().VITE_STACKS_API, stxAddress, startStacksBlock);
			totalBalanceAtHeight = Number(response.stx?.balance || 0);
			lockedBalanceAtHeight = Number(response.stx?.locked || 0);
			balanceAtHeight = fromMicroAmount(Number(response.stx.balance) - Number(response.stx.locked));
			inited = true;
		} catch (e: any) {
			balanceAtHeight = $sessionStore.keySets[getConfig().VITE_NETWORK].walletBalances?.stacks.amount || 0;
			inited = true;
		}
	});
</script>

<svelte:head>
	<title>Ecosystem DAO - SIP Voting</title>
	<meta name="description" content="Stacks Improvement Proposals - governance of the Stacks Blockchain." />
</svelte:head>

<div class="mx-auto max-w-7xl py-6 md:px-6">
	{#if proposal && inited}
		<ProposalHeader {proposal} />

		{#if isVoting(proposal)}
			{#if method === 1}
				<SoloVotingActive {proposal} onSwitchVotingMethod={switchVotingMethod} />
			{:else if method === 2}
				<PoolVotingActive {proposal} {totalBalanceAtHeight} {lockedBalanceAtHeight} on:toggle_voting_method={switchVotingMethod} />
			{:else if method === 3}
				{#if $sessionStore.stacksInfo?.burn_block_height >= proposal.proposalData.burnStartHeight}
					<DaoVotingActive {proposal} adjustBal={balanceAtHeight} />
				{:else}
					<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
						<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
							<Holding />
						</div>
					</div>
				{/if}
			{:else}
				<div class="flex flex-col gap-y-6 rounded-md border border-gray-900 bg-white/5 p-4">
					<Skeleton size="md" />
				</div>
			{/if}
		{:else if isProposedPreVoting(proposal)}
			<Holding />
		{:else if isConclusionPending(proposal)}
			<div class="flex justify-around">
				{#if isCoordinator(getStxAddress())}<div class="my-3 text-sm">
						<a href="/" class="text-bloodorange" on:click|preventDefault={() => conclude()}>Voting closed - please conclude</a>
					</div>
				{:else}
					Voting has ended. Results will be published soon.
				{/if}
			</div>
		{:else}
			<DaoConcluded {proposal} />
		{/if}
	{:else}
		<Placeholder message={'Proposal not found'} link={getCurrentProposalLink(page.params.contractId)} />
	{/if}
</div>
