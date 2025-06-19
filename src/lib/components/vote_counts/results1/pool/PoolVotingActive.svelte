<script lang="ts">
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import PoolVotingActiveQr from './PoolVotingActiveQR.svelte';
	import VotingPower from '../dao-voting/VotingPower.svelte';
	import { explorerTxUrl, isLoggedIn, loginStacksFromHeader } from '$lib/stacks/stacks-connect';

	export let switchVotingMethod: any;
	export let proposal: VotingEventProposeProposal;
	export let lockedBalanceAtHeight: number;
	export let totalBalanceAtHeight: number;
	let revealAddresses = true;
	let justVoted = false;
	let txId: string;
	let showVotingPower = false;

	const login = async () => {
		//const res = await loginStacksFromHeader(document);
		await loginStacksFromHeader(document);
	};

	const doVotingEvent = (e: any) => {
		txId = e.detail.txId;
		justVoted = true;
	};

	// const toggleMethod = (method: number) => {
	// 	//dispatch('toggle_voting_method', { method });
	// };
</script>

<div class="my-8 flex w-full flex-col">
	<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
		{#if justVoted}
			<div class="">
				<div class="mb-4">
					<h2 class="mb-3 text-2xl text-[#131416]">Thanks for voting !!</h2>
				</div>
				<div class="relative w-4/5 space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
					<p>
						Track your vote <a class="underline hover:text-blue-500" target="_blank" href={explorerTxUrl(txId)}>here</a>
					</p>
					<p>
						Results will be posted after voting closes at block {proposal.proposalData.burnEndHeight}
					</p>
				</div>
			</div>
		{:else}
			<div class="text-black">
				<div class="mb-4">
					<h2 class="mb-3 text-2xl text-[#131416]">Stacks Voting</h2>
				</div>
				<div class="relative space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
					<p>Vote by sending a dust stacks transaction (~1 micro stx) to either;</p>
					<ul class="mb-5 list-disc pl-6">
						<li>an address representing "Yes" to the proposal</li>
						<li>an address representing "No" to this proposal.</li>
					</ul>
					<div class="relative rounded-lg bg-[#E6E4E2] py-3">
						<p>
							<a
								class="underline hover:text-blue-500"
								href="/"
								on:click|preventDefault={() => {
									switchVotingMethod(1);
								}}>Prefer to vote with a bitcoin transaction ?</a
							>
						</p>
					</div>
					{#if isLoggedIn() && showVotingPower}
						<div class="mb-8">
							<VotingPower {proposal} />
						</div>
					{/if}
					{#if revealAddresses}
						<div class="mb-8 space-y-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
							<div class="col-span-1 rounded-2xl bg-[#121314] p-8">
								<h3 class="mb-5 text-3xl text-white">Cast your vote</h3>
							</div>
							<div class="col-span-2">
								<div class="mb-5">
									{#if !isLoggedIn()}
										<button
											on:click={() => {
												login();
											}}
											class="focus-visible:outline-black-500/50 block w-full rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
										>
											Connect Wallet
										</button>
									{/if}
								</div>
								<div class="col-span-2">
									<div class="mb-3 flex flex-col space-y-4">
										<PoolVotingActiveQr {proposal} {totalBalanceAtHeight} {lockedBalanceAtHeight} onVotingEvent={doVotingEvent} />
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
