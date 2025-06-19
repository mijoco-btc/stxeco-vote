<script lang="ts">
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { readStackerEvents, readVotingContractEvents } from '../voting-stacker';

	export let proposal: VotingEventProposeProposal;
	let message: string;
	let thisBaseDao = 'bitcoin-dao';

	const syncStackerVotes = async () => {
		readStackerEvents(proposal.proposal);
		message = 'Reading voting events for contract: ' + proposal;
	};

	const syncDaoVotes = async () => {
		if (!proposal.extension) return;
		readVotingContractEvents(true, thisBaseDao, proposal.extension);
		message = 'Reading voting events for contract: ' + proposal.extension;
	};
</script>

<div class="col-span-4">
	<a href="/">{proposal.proposal}</a>
</div>
<div class="col-span-1">
	{proposal.proposalData.concluded}
</div>
<div class="col-span-1">
	<!--<a class="pointer text-light" href="/" on:click|preventDefault={() => { openSesame() }}>Clarity</a>-->
	<a class="pointer text-light ms-3 border-s ps-3" href="/" on:click|preventDefault={() => syncDaoVotes()}>Non-Stackers</a>
	<a class="pointer text-light ms-3 border-s ps-3" href="/" on:click|preventDefault={() => syncStackerVotes()}>Stackers</a>
</div>
