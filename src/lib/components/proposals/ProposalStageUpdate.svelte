<script lang="ts">
	import { fmtNumber } from '$lib/utils';
	import { sessionStore } from '$stores/stores';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers';
	import { onMount } from 'svelte';
	import { isProposedPreVoting, isVoting } from './proposals';
	import Countdown from '../vote_counts/Countdown.svelte';

	export let proposal: VotingEventProposeProposal;

	$: endBitcoinBlock = () => {
		const currentHeight = proposal.submissionContract.indexOf('008') > -1 ? $sessionStore.stacksInfo.stacks_tip_height : $sessionStore.stacksInfo?.burn_block_height || 0;
		return proposal.proposalData.burnEndHeight - currentHeight;
	};

	$: startsInBitcoinBlock = () => {
		const currentHeight = proposal.submissionContract.indexOf('008') > -1 ? $sessionStore.stacksInfo.stacks_tip_height : $sessionStore.stacksInfo?.burn_block_height || 0;
		return proposal.proposalData.burnStartHeight - currentHeight;
	};

	onMount(async () => {});
</script>

<div class="inline-block rounded-2xl border border-[#131416]/[12%] px-6 pb-1 pt-2">
	<div class="mb-1 flex items-center gap-2">
		<span class="h-2 w-2 rounded-full bg-bloodorange"></span>
		<p class="font-mono text-xs uppercase tracking-wider text-bloodorange">
			{#if isProposedPreVoting(proposal)}
				Voting starts in {fmtNumber(startsInBitcoinBlock())} blocks
			{:else if isVoting(proposal)}
				Vote in progress
			{:else}
				Voting closed
			{/if}
		</p>
	</div>
	{#if isVoting(proposal)}
		<div class="font-mono text-xs uppercase tracking-wider text-[#131416]">
			Ends in {fmtNumber(endBitcoinBlock())} bitcoin blocks
		</div>
		<div class="mt-1 font-mono text-xs uppercase tracking-wider text-[#131416]">
			<Countdown scaleFactor={1} endBlock={endBitcoinBlock()} />
		</div>
	{:else}
		<div class="mt-1 font-mono text-xs uppercase tracking-wider text-[#131416]">
			<Countdown scaleFactor={1} endBlock={startsInBitcoinBlock()} />
		</div>
	{/if}
</div>
