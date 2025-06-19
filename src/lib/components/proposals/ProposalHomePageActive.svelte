<script lang="ts">
	import { goto } from '$app/navigation';
	import BullsEye from '$lib/assets/home/BullsEye.svelte';
	import LinkInChainIcon from '$lib/assets/home/LinkInChainIcon.svelte';
	import { fmtNumber } from '$lib/utils';
	import { getConfig } from '$stores/store_helpers';
	import { sessionStore } from '$stores/stores';
	import type { HeaderItem, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';
	import { AdjustmentsHorizontal, Icon } from 'svelte-hero-icons';
	import { concludeVote } from '../vote_counts/voting_api';
	import { getStxAddress, isCoordinator } from '$lib/stacks/stacks-connect';
	import { isConclusionPending, isProposedPreVoting, isVoting } from './proposals';
	import Countdown from '../vote_counts/Countdown.svelte';

	export let prop: VotingEventProposeProposal;
	export let infoItems: Array<HeaderItem>;
	let currentBurnHeight: number = $sessionStore.stacksInfo.burn_block_height;

	const conclude = async () => {
		const result = await concludeVote(prop.contract.source, prop.proposal);
	};

	const getIntLink = () => {
		if (isVoting(prop)) {
			return `/proposal/${prop.proposal}`;
		} else if (prop.stackerData?.nodao) {
			return `/proposal/results-v2/${prop.proposal}`;
		} else {
			return `/proposal/results-v1/${prop.proposal}`;
		}
	};

	const getSipLink = () => {
		if (prop.links && prop.links.length > 0 && prop.links[0].href) {
			return prop.links[0].href;
		}
		return `/proposal/${prop.proposal}`;
	};

	const getAdminLink = () => {
		return `/proposal/tally/${prop.proposal}`;
	};

	onMount(async () => {
		if (prop && prop.proposal.indexOf('029') > -1) {
			prop.proposalMeta.title = 'SIP-029 Preserving Economic Incentives During Stacks Network Upgrades';
			prop.proposalMeta.description =
				'The first Stacks halving is expected to take place 210,384 Bitcoin blocks after the Stacks 2.0 starting height, 666,050, which is Bitcoin height 876,434, which is set to occur during Reward Cycle 100 in December 2024, cutting the STX block reward from 1,000 STX to 500 STX. This SIP proposes a modification to the emissions schedule given that the network is going through two major launches (Nakamoto and sBTC) which rely on predictable economic incentives. The proposed schedule modification and associated STX emission rate would create time for Nakamoto and sBTC to launch and settle in, but, being mindful of supply, would still result in an overall reduced target 2050 STX supply (0.77% lower) and a reduced tail emission rate (50% lower).';
		}
	});
</script>

<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
	<!-- <NakamotoRelease/> -->
	<div class="relative z-[1] mt-4 sm:mt-0">
		<div class="mb-4">
			<h2 class="mb-3 text-3xl text-[#131416]">
				<a href={getIntLink()}>{@html prop.proposalMeta.title}</a>
				<a href={getSipLink()} target="_blank" title="link to SIP doucment in Github"><LinkInChainIcon /></a>
				{#if isCoordinator(getStxAddress())}<a href={getAdminLink()}> <Icon class="inline" src={AdjustmentsHorizontal} width={30} height={30} /></a>{/if}
			</h2>
			<div class="mb-5 text-sm text-gray-700">
				Bitcoin voting window: {fmtNumber(prop.proposalData.burnStartHeight)} until {fmtNumber(prop.proposalData.burnEndHeight)}
			</div>
			<p class="text-lg text-[#605D5D]">{@html prop.proposalMeta.description.split('<br/>')[0]}</p>
		</div>
		{#if prop.links && prop.links.length > 0}
			<div class="mb-8 pt-0">
				<ul class=" text-[#605D5D]">
					{#each prop.links as item}
						<li>
							<a class="text-sm underline" href={item.href} target={item.target}>{item.display}</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="flex flex-col justify-items-start gap-y-2 text-black">
			{#if isProposedPreVoting(prop)}<div class="text-sm">
					Starts: <Countdown scaleFactor={1} endBlock={prop.proposalData.burnStartHeight - currentBurnHeight} />
				</div>
			{:else if isVoting(prop)}
				<div class="flex w-full justify-start gap-x-5">
					<div class="">
						<button
							on:click={() => {
								goto('/proposal/' + prop.proposal);
							}}
							class="focus-visible:outline-black-500/50 block w-auto space-y-3 rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Cast your vote
						</button>
					</div>
				</div>
				<div class="text-sm">
					Voting ends: <Countdown scaleFactor={1} endBlock={prop.proposalData.burnEndHeight - currentBurnHeight} />
				</div>
			{:else if isConclusionPending(prop)}
				{#if isCoordinator(getStxAddress())}<div class="my-3 text-sm">
						<a href="/" class="text-bloodorange" on:click|preventDefault={() => conclude()}>Voting closed - please conclude</a>
					</div>
				{:else}
					Voting has ended. Results will be published soon.
				{/if}
			{/if}
		</div>

		{#if infoItems && infoItems.length > 0}
			<div class="pt-4">
				<h2 class="mb-3 text-xl text-[#131416]">Learn more</h2>
				<ul class="list-disc pl-4 text-[#605D5D]">
					{#each infoItems as item}
						<li><a class="underline" href={item.href} target={item.target}>{item.display}</a></li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	<BullsEye />
</div>
