<script lang="ts">
	import NakamotoResultsBackground from '../../ui/NakamotoResultsBackground.svelte';
	import tick from '$lib/assets/tick.png';
	import cross from '$lib/assets/cross.png';
	import { sessionStore } from '$stores/stores';
	import { onMount } from 'svelte';
	import type { ResultsSummary } from '@mijoco/stx_helpers/dist/index';
	import { NAKAMOTO_VOTE_STOPS_HEIGHT } from '../voting_api';

	export let approved = false;
	export let poolSummary: any;
	export let soloSummary: any;
	export let daoSummary: ResultsSummary;
	export let poolVoting;
	export let soloVoting;

	let poolPercent = '0';
	let soloPercent = '0';
	let daoPercent = '0';

	const blockSinceEnd = () => {
		return $sessionStore.stacksInfo?.burn_block_height - NAKAMOTO_VOTE_STOPS_HEIGHT;
	};

	onMount(async () => {
		let stxFor = poolSummary.votesFor?.total || 0;
		let stxAgainst = poolSummary.votesAgn?.total || 0;
		let stxPower = stxFor + stxAgainst;

		poolPercent = ((stxFor / stxPower) * 100).toFixed(4);

		stxFor = soloSummary.votesFor?.total || 0;
		stxAgainst = soloSummary.votesAgn?.total || 0;
		stxPower = stxFor + stxAgainst;

		soloPercent = ((stxFor / stxPower) * 100).toFixed(4);

		if (daoSummary) {
			const votesFor = daoSummary.summary.find((o) => o._id.event === 'vote' && o._id.for);
			const votesAgn = daoSummary.summary.find((o) => o._id.event === 'vote' && !o._id.for);
			stxFor = daoSummary.proposalData.votesFor;
			stxAgainst = daoSummary.proposalData.votesAgainst;
			stxPower = stxFor + stxAgainst;
			daoPercent = ((stxFor / stxPower) * 100).toFixed(4);
		}
	});
</script>

<div class="mb-8 space-y-4 align-top lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
	<div class="stretch self-start rounded-2xl bg-[#121314] p-8">
		<h3 class="text-3xl font-extralight text-white">Vote results</h3>
	</div>
	{#if blockSinceEnd() > 0}
		<div class="border-error-600 relative col-span-2 rounded-2xl bg-[#1c671b] p-8">
			<div class="mb-5 flex justify-between">
				<div></div>
				<div><span class="text-4xl font-extrabold"></span></div>
			</div>
			<div class="mb-5 flex justify-between">
				<div><span class="">Voting has closed</span></div>
			</div>
			{#if soloVoting}
				<div class="mb-5 flex justify-between">
					<div><span class="text-4xl font-extrabold">Solo Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{soloPercent} %</span></div>
					<div>
						{#if Number(soloPercent) >= 80}<img alt="correct" src={tick} />{:else}<img alt="correct" src={cross} />{/if}
					</div>
				</div>
			{/if}
			{#if poolVoting}
				<div class="mb-5 flex justify-between">
					<div><span class="text-4xl font-extrabold">Pool Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{poolPercent} %</span></div>
					<div>
						{#if Number(poolPercent) >= 80}<img alt="correct" src={tick} />{:else}<img alt="correct" src={cross} />{/if}
					</div>
				</div>
			{/if}
			{#if daoSummary}
				<div class="mb-2 flex justify-between">
					<div><span class="text-4xl font-extrabold">Non-Stackers</span></div>
					<div><span class="text-4xl font-extrabold">{daoPercent} %</span></div>
					<div>
						{#if Number(daoPercent) >= 66}<img alt="correct" src={tick} />{:else}<img alt="correct" src={cross} />{/if}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="border-error-600 relative col-span-2 rounded-2xl bg-[#1c671b] p-8">
			{#if approved}
				<div class="mb-5 flex justify-between">
					<div><img alt="correct" src={tick} /></div>
					<div><span class="text-4xl font-extrabold">YES</span></div>
				</div>
				<div class="flex justify-between">
					<div><span class="">Proposal failed to pass</span></div>
				</div>
			{:else}
				<div class="mb-5 flex justify-between">
					<div><img alt="correct" src={cross} /></div>
					<div><span class="text-4xl font-semibold">NO</span></div>
				</div>
				<div class="flex flex-col">
					<div><span class="">Proposal failed to pass</span></div>
					<div>
						<span class="">Check below for the detailed breakdown on each voting method</span>
					</div>
				</div>
			{/if}
			<NakamotoResultsBackground />
		</div>
	{/if}
</div>
