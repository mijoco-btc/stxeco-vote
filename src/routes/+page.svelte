<script lang="ts">
	import { page } from '$app/state';
	import ProposalHomePageActive from '$lib/components/proposals/ProposalHomePageActive.svelte';
	import ProposalHomePageEmptyItem from '$lib/components/proposals/ProposalHomePageEmptyItem.svelte';
	import ProposalHomePageInactive from '$lib/components/proposals/ProposalHomePageInactive.svelte';
	import ProposalHomePageTentative from '$lib/components/proposals/ProposalHomePageTentative.svelte';
	import ProposalStageCustom from '$lib/components/proposals/ProposalStageCustom.svelte';
	import PageIntro from '$lib/components/ui/PageIntro.svelte';
	import { getStxAddress, isCoordinator } from '$lib/stacks/stacks-connect';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';

	export let data: {
		proposals: Array<VotingEventProposeProposal>;
		tentativeProposals: Array<any>;
		inactiveProposals: Array<VotingEventProposeProposal>;
	};
	let { proposals, tentativeProposals, inactiveProposals } = data;

	let message = 'STX ECO is the all-in-one voting platform where the Stacks community can weigh in on major protocol changes';
	let listingsMessages = ['stacks improvement proposals', 'all proposals'];
	let showAllProposals = false;
	let listingsMessage = listingsMessages[0];
	let componentKey = 0;
	let showInactiveProposals = true;
	let coordinator = false;

	let activeProposals: Array<VotingEventProposeProposal>;

	const toggleListings = async () => {
		if (page.url.hostname.indexOf('localhost') === -1) return;
		showAllProposals = !showAllProposals;
		listingsMessage = showAllProposals ? listingsMessages[1] : listingsMessages[0];
		componentKey++;
	};

	onMount(async () => {
		if (tentativeProposals) tentativeProposals = tentativeProposals.filter((o) => o.visible);
		if (inactiveProposals) inactiveProposals = inactiveProposals.filter((o) => !o.stackerData?.removed);
		inactiveProposals = inactiveProposals.reverse();
		if (proposals) {
			//activeProposals = activeProposals.filter((o) => !o.stackerData?.removed);
			activeProposals = proposals.filter((o) => !o.proposalData.concluded);
			activeProposals = activeProposals.filter((o) => !o.stackerData?.removed);
		}
		coordinator = isCoordinator(getStxAddress());
	});
</script>

<svelte:head>
	<title>Ecosystem DAO - Nakamoto SIP Voting</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<PageIntro {message} />

<div class="mx-auto max-w-7xl py-4 md:px-6">
	<div class="my-8 flex w-full flex-col">
		<div>
			<div class="space-y-6">
				<ProposalStageCustom message={listingsMessage} on:toggle_proposal_listings={toggleListings} />

				{#key componentKey}
					{#if tentativeProposals && tentativeProposals.length > 0}
						<div>
							<h1 class="mt-6 text-2xl text-[#0A0A0B] sm:-mx-4 sm:text-4xl">
								<a href="/" on:click|preventDefault={() => {}} class="rounded-md px-4 py-2" target="_blank"> Upcoming proposals </a>
							</h1>
						</div>
						{#each tentativeProposals as prop}
							<ProposalHomePageTentative {prop} infoItems={[]} />
						{/each}
						{#if !tentativeProposals || tentativeProposals.length === 0}
							<ProposalHomePageEmptyItem propType={'upcoming'} />
						{/if}
					{/if}

					{#if activeProposals && activeProposals.length > 0}
						{#each activeProposals as prop}
							{#if showAllProposals || (prop.stackerData && prop.stackerData.sip)}
								<ProposalHomePageActive {prop} infoItems={[]} />
							{/if}
						{/each}
					{/if}
					{#if !activeProposals || activeProposals.length === 0}
						<ProposalHomePageEmptyItem propType={'active'} />
					{/if}

					{#if showInactiveProposals && inactiveProposals && inactiveProposals.length > 0}
						{#each inactiveProposals as proposal}
							{#if (proposal.stackerData && proposal.stackerData.sip) || showAllProposals}
								<ProposalHomePageInactive {proposal} />
							{/if}
						{/each}
						{#if !inactiveProposals || inactiveProposals.length === 0}
							<ProposalHomePageEmptyItem propType={'inactive'} />
						{/if}
					{/if}
				{/key}
			</div>
		</div>
	</div>
</div>
