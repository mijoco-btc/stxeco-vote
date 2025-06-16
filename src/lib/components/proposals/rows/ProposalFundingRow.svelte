<script lang="ts">
	import { getFunding } from "$lib/proposals";
	import { COMMS_ERROR, fmtMicroToStx } from "$lib/utils";
	import type {  FundingData, VotingEventProposeProposal } from "@mijoco/stx_helpers/dist/index";
	import { onMount } from "svelte";


    export let proposal:VotingEventProposeProposal;
	let funding:FundingData;

    const clazzes = ' py-2 w-full grid grid-cols-3 lg:grid-cols-4 justify-between my-0 text-md'

	onMount(async () => {
		funding = await getFunding(proposal.submissionContract, proposal.proposal)
  	})

</script>

<div class={(proposal.proposalData?.concluded) ? ' text-gray-200 grid-cols-4 justify-end' + clazzes : 'text-gray-300 grid-cols-3 justify-end' + clazzes}>
	<div class="grow col-span-2"><span><a class="text-blue-500 hover:underline" href={'/dao/proposals/' + proposal.proposal}>{proposal.proposalMeta.title}</a></span></div>
	{#if funding}
	<div class="inline-flex whitespace-nowrap flex-shrink">{fmtMicroToStx(funding.funding)}</div>
	<div class="inline-flex whitespace-nowrap flex-shrink">{fmtMicroToStx(funding.parameters.fundingCost)}</div>
	{/if}
</div>
