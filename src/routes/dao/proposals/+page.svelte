<script lang="ts">
	import { onMount } from 'svelte';
	import { Skeleton, Tabs, TabItem } from 'flowbite-svelte';
	import { COMMS_ERROR } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers';
	import { getAllProposals } from '$lib/components/proposals/proposals';
	import TentativeProposalHeader from '$lib/components/proposals/rows/TentativeProposalHeader.svelte';
	import TentativeProposalRow from '$lib/components/proposals/rows/TentativeProposalRow.svelte';
	import ProposalVotingHeader from '$lib/components/proposals/rows/ProposalVotingHeader.svelte';
	import ProposalActiveRow from '$lib/components/proposals/rows/ProposalActiveRow.svelte';
	import ProposalClosedRow from '$lib/components/proposals/rows/ProposalClosedRow.svelte';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/components/ui/NakamotoShield.svelte';

	// fetch/hydrate data from local storage
	let inited = false;
	let errorReason: string | undefined;
	let tentative: Array<any> | undefined;
	let funding: Array<VotingEventProposeProposal> | undefined;
	let open: Array<VotingEventProposeProposal> | undefined;
	let closed: Array<VotingEventProposeProposal> | undefined;
	let tabStatus = 'tentative';
	onMount(async () => {
		try {
			const proposals: Array<VotingEventProposeProposal> = await getAllProposals();
			closed = proposals.filter((o) => o.proposalData.concluded);
			open = proposals.filter((o) => !o.proposalData.concluded);
			if ($page.url.searchParams.has('status')) tabStatus = $page.url.searchParams.get('status') || 'funding';
			inited = true;
		} catch (err) {
			errorReason = COMMS_ERROR;
		}
	});
</script>

<svelte:head>
	<title>Transactions</title>
	<meta name="description" content="A detailed table of all the transactions." />
</svelte:head>
<div class="mx-auto max-w-7xl py-6 md:px-6">
	<div>
		<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
			<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
				<div class="flex flex-col gap-y-2">
					<div class="mb-4">
						<h2 class="mb-3 text-2xl text-[#131416]">Proposals</h2>
						<p>Follow <a href="/dao/proposals/propose">instructions here to propose something</a></p>
					</div>
					<Tabs style="underline" contentClass="py-4">
						<TabItem open={tabStatus === 'tentative'} on:click={() => goto('/dao/proposals?status=tentative')} title="Tentative">
							{#if inited}
								<div class="rounded-md bg-white/5 p-4">
									{#if tentative && tentative.length > 0}
										<TentativeProposalHeader />
										{#each tentative as event}
											<TentativeProposalRow {event} />
										{/each}
									{:else}
										None
									{/if}
								</div>
							{:else}
								<Skeleton size="md" />
							{/if}
						</TabItem>
						<TabItem open={tabStatus === 'open'} on:click={() => goto('/dao/proposals?status=open')} title="Open">
							{#if inited}
								<div class="rounded-md bg-white/5 p-4">
									{#if open && open.length > 0}
										<ProposalVotingHeader />
										{#each open as event}
											<ProposalActiveRow {event} />
										{/each}
									{:else}
										None
									{/if}
								</div>
							{:else}
								<Skeleton size="md" />
							{/if}
						</TabItem>
						<TabItem open={tabStatus === 'closed'} on:click={() => goto('/dao/proposals?status=closed')} title="Closed">
							{#if inited}
								<div class="rounded-md bg-white/5 p-4">
									{#if closed && closed.length > 0}
										<ProposalVotingHeader />
										{#each closed as event}
											<ProposalClosedRow {event} />
										{/each}
									{:else}
										None
									{/if}
								</div>
							{:else}
								<Skeleton size="md" />
							{/if}
						</TabItem>
					</Tabs>
				</div>

				<NakamotoBackground />
				<NakamotoShield />
			</div>
		</div>
	</div>
</div>
