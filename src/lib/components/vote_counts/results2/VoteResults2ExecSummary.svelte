<script lang="ts">
	import { CheckCircleSolid, XSolid } from 'flowbite-svelte-icons';
	import { sessionStore } from '$stores/stores';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';
	import type { ProposalData } from '@mijoco/stx_helpers/dist/dao';
	import { getSummaryNodao, NAKAMOTO_VOTE_STOPS_HEIGHT } from '../voting_api';

	type Results2Summary = {
		bSumAg: number;
		bSumFor: number;
		bTotalAg: number;
		bTotalFor: number;
		lockedPercent: string;
		proposalData: ProposalData;
		sSumAg: number;
		sSumFor: number;
		sTotalAg: number;
		sTotalFor: number;
		totalLockedAg: number;
		totalLockedFor: number;
		totalLockedPower: number;
		totalUnlockedAg: number;
		totalUnlockedFor: number;
		totalUnlockedPower: number;
		uniqueAccounts: number;
		unlockedPercent: string;
	};

	export let proposal: VotingEventProposeProposal;
	let approved = true;
	let summary: Results2Summary;
	let unlockedP: number;
	let lockedP: number;
	let customMajority: number;

	let poolPercent = '0';
	let soloPercent = '0';

	const blockSinceEnd = () => {
		return $sessionStore.stacksInfo?.burn_block_height - NAKAMOTO_VOTE_STOPS_HEIGHT;
	};

	onMount(async () => {
		//daoSummary = await getDaoSummary(proposal.proposal);
		summary = await getSummaryNodao(proposal.proposal);
		summary.proposalData = proposal.proposalData;
		lockedP = Number(summary.lockedPercent);
		unlockedP = Number(summary.unlockedPercent);
		customMajority = proposal.proposalData.customMajority / 100;
		approved = Number(summary.lockedPercent) > customMajority;
	});
</script>

<div class="mb-8 space-y-4 align-top lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
	<!--
	<div class="p-8 stretch bg-[#1c671b] rounded-2xl self-start">
	  	<h3 class="text-3xl text-white font-extralight">Vote passed</h3>
	</div>
	-->
	{#if summary}
		<div class="bg-success-01 border-error-600 relative col-span-3 rounded-2xl bg-[#1c671b] p-8">
			{#if soloPercent !== 'NaN'}
				<div class="mb-5 flex flex-col justify-between gap-y-3 text-white md:flex-row">
					<div class="w-1/4"><span class="text-4xl font-extrabold">Locked</span></div>
					<div class="grow">
						<span class="text-4xl font-extrabold">{summary.lockedPercent} %</span>
					</div>
					<div>
						{#if Number(summary.lockedPercent) >= customMajority}
							<CheckCircleSolid class="h-10 w-10 text-white " />
						{:else}
							<XSolid class="text-red-500 h-10 w-10" />
						{/if}
					</div>
				</div>
			{/if}

			{#if summary.unlockedPercent !== 'NaN'}
				<div class="mb-5 flex flex-col justify-between gap-y-3 text-white md:flex-row">
					<div class="w-1/4"><span class="text-4xl font-extrabold">Unlocked</span></div>
					<div class="grow">
						<span class="text-4xl font-extrabold">{summary.unlockedPercent} %</span>
					</div>
					<div>
						{#if lockedP >= customMajority}
							<CheckCircleSolid class="h-10 w-10 text-white " />
						{:else}
							<XSolid class="text-red-500 h-10 w-10" />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
