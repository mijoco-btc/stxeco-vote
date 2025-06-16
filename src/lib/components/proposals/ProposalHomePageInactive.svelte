<script lang="ts">
	import BullsEye from '$lib/assets/home/BullsEye.svelte';
	import LinkInChainIcon from '$lib/assets/home/LinkInChainIcon.svelte';
	import { getStxAddress, isCoordinator } from '$lib/stacks/stacks-connect';
	import { fmtNumber } from '$lib/utils';
	import { getConfig } from '$stores/store_helpers';
	import { sessionStore } from '$stores/stores';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';
	import { AdjustmentsHorizontal, Icon } from 'svelte-hero-icons';
	import VoteResults2ExecSummary from '../vote_counts/results2/VoteResults2ExecSummary.svelte';
	import VoteResultsExecSummary from '../vote_counts/VoteResultsExecSummary.svelte';

	export let proposal: VotingEventProposeProposal;
	let burnHeight = $sessionStore.stacksInfo.burn_block_height;

	const isStacksEndHeight = () => {
		return proposal.proposalData.burnEndHeight < 700000;
	};

	const getLink = () => {
		if (proposal.stackerData?.nodao) {
			return `/proposal/results-v2/${proposal.proposal}`;
		}
		return `/proposal/results-v1/${proposal.proposal}`;
	};

	const getAdminLink = () => {
		return `/proposal/tally/${proposal.proposal}`;
	};

	onMount(async () => {});
</script>

<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
	<!-- <NakamotoRelease/> -->
	<div class="relative z-[1] mt-4 sm:mt-0">
		<div class="mb-4">
			<h2 class="mb-3 text-3xl text-[#131416]">
				<a href={getLink()}>{@html proposal.proposalMeta.title} <LinkInChainIcon /></a>
				{#if isCoordinator(getStxAddress())}<a href={getAdminLink()}> <Icon class="inline" src={AdjustmentsHorizontal} width={30} height={30} /></a>{/if}
			</h2>

			<p>
				{#if isStacksEndHeight()}
					Voting ended at Stacks block <strong>{fmtNumber(proposal.proposalData.burnEndHeight)}</strong>.
				{:else}
					Voting ended at Bitcoin block <strong>{fmtNumber(proposal.proposalData.burnEndHeight)}</strong>.
				{/if}
			</p>
			<p class="mt-5 text-lg text-[#605D5D]">
				{@html proposal.proposalMeta.synopsis.replaceAll(';;', '')}
			</p>
		</div>
		{#if proposal.links && proposal.links.length > 0}
			<div class="mb-8 pt-4">
				<ul class="list-disc pl-4 text-[#605D5D]">
					{#each proposal.links as item}
						<li><a class="underline" href={item.href} target={item.target}>{item.display}</a></li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if proposal}
			{#if proposal.stackerData?.nodao}
				<VoteResults2ExecSummary {proposal} />
			{:else}
				<VoteResultsExecSummary {proposal} />
			{/if}
		{/if}
	</div>
	<BullsEye />
</div>
