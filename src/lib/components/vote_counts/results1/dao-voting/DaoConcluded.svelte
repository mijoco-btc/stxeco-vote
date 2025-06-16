<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { fmtNumber } from '$lib/utils';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/components/ui/NakamotoShield.svelte';

	export let proposal: VotingEventProposeProposal;

	let burnHeight = $sessionStore.stacksInfo.burn_block_height;

	onMount(async () => {});
</script>

<svelte:head>
	<title>Ecosystem DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div>
	<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
		<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12 md:px-12">
			<div class="">
				<div class="mb-4">
					<h2 class="mb-3 text-2xl text-[#131416]">Voting ended</h2>
				</div>
				<div class="relative max-w-xl space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
					<p>Voting ended <strong>{fmtNumber(burnHeight - proposal.proposalData.burnEndHeight)} blocks ago</strong>.</p>
					<p class="text-lg">Vote results can be found <a class="text-warning-900 underline" href={`/proposal/results-v1/${proposal.proposal}`}>here</a></p>
				</div>
			</div>

			<NakamotoBackground />
			<NakamotoShield />
		</div>
	</div>
</div>
