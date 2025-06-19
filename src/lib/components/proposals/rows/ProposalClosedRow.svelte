<script lang="ts">
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers';

	export let event: VotingEventProposeProposal;

	const clazzes = 'border-b border-gray-1000 py-2 w-full grid grid-cols-3 lg:grid-cols-4 justify-between my-0 text-md';
</script>

<div class={event.proposalData?.concluded ? ' grid-cols-4 justify-end text-gray-200' + clazzes : 'grid-cols-3 justify-end text-gray-300' + clazzes}>
	<div class="col-span-2 grow"><span><a class="text-blue-500 hover:underline" href={'/proposal/' + event.contract}>{event.proposalMeta.title}</a></span></div>
	<div class="inline-flex flex-shrink whitespace-nowrap">{Math.round(event.proposalData.votesFor / 1000000)}</div>
	<div class="inline-flex flex-shrink whitespace-nowrap">{Math.round(event.proposalData.votesAgainst / 1000000)}</div>
</div>
