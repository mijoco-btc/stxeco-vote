<script lang="ts">
	import { getConfig } from '$stores/store_helpers';
	import { fmtMicroToStx, fmtNumber, fromMicroAmount } from '$lib/utils';
	import { sessionStore } from '$stores/stores';
	import BallotBox from './DaoVotingBallotBox.svelte';
	import { onMount } from 'svelte';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getDaoVotesByProposalAndVoter, toOnChainAmount } from '../../voting_api';
	import { isVoting } from '$lib/components/proposals/proposals';
	import { getStxAddress, isLoggedIn } from '$lib/stacks/stacks-connect';
	import Banner from '$lib/components/ui/Banner.svelte';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/components/ui/NakamotoShield.svelte';

	export let proposal: VotingEventProposeProposal;
	export let adjustBal: number;
	const votes: any[] = [];
	let voted = 0;
	let balanceAtHeight = 0;
	let votedPower = 0;
	let inited = false;

	onMount(async () => {
		const daoVotes = await getDaoVotesByProposalAndVoter(proposal.proposal, getStxAddress());
		if (daoVotes && daoVotes.length > 0) {
			daoVotes.forEach((o: any) => {
				if (o) votes.push(o);
				const amountVoted = Number(o.amount);
				if (o.for) {
					votedPower += amountVoted;
				} else {
					votedPower += amountVoted;
				}
				voted++;
			});
			balanceAtHeight = toOnChainAmount(adjustBal) - votedPower;
			balanceAtHeight = balanceAtHeight;
		} else {
			balanceAtHeight = toOnChainAmount(adjustBal);
		}
		balanceAtHeight = fromMicroAmount(balanceAtHeight);
		inited = true;
	});
</script>

{#if inited}
	<div>
		<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
			<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
				<div class="bg-warning-01 flex flex-col gap-y-2">
					<div class="mb-4">
						<h2 class="mb-3 text-2xl text-[#131416]">Voting for Non-Stackers</h2>
					</div>
					<div class="relative mb-4 max-w-xl space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
						<p>Vote with your liquid STX balance using your Leather / Xverse wallet.</p>
						{#if !isLoggedIn()}
							<p>Connect your wallet to vote!</p>
						{/if}
					</div>

					{#if isLoggedIn()}
						{#if voted > 0}
							<div class="mb-3 max-w-xl">
								<Banner bannerType={'warning'} message={'Account has voted with ' + fmtMicroToStx(votedPower) + ' stx. <a href="/dao/proposals/' + proposal.proposal + '/badge?method=3" >collect your badge here!</a>'} />
							</div>
						{/if}

						{#if balanceAtHeight > 0}
							<div>
								{#if isVoting(proposal)}
									<BallotBox {proposal} {balanceAtHeight} />
								{/if}
							</div>
						{:else if voted === 0 && isLoggedIn()}
							<div class="mb-3 max-w-xl">
								<Banner bannerType={'warning'} message={'Already voted or your snapshot balance when voting began (at block ' + fmtNumber(proposal.proposalData.startBlockHeight) + ') was 0 STX.'} />
							</div>
						{/if}
					{/if}
				</div>

				<NakamotoBackground />
				<NakamotoShield />
			</div>
		</div>
	</div>
{/if}
