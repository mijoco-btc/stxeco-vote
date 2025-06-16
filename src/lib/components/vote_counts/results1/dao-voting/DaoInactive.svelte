<script lang="ts">
	import { openContractCall } from '@stacks/connect';
	import { PostConditionMode, contractPrincipalCV } from '@stacks/transactions';
	import { getStacksNetwork } from '@mijoco/stx_helpers/dist/stacks-node';
	import { getConfig, getDaoConfig } from '$stores/store_helpers';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { isConclusionPending, isPostVoting } from '$lib/components/proposals/proposals';
	import { explorerTxUrl } from '$lib/stacks/stacks-connect';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import NakamotoShield from '$lib/components/ui/NakamotoShield.svelte';

	export let proposal: VotingEventProposeProposal;
	export let method = 1;
	let txId: string | undefined;

	const concludeVote = async () => {
		const deployer = getDaoConfig().VITE_DOA_DEPLOYER;
		const proposalCV = contractPrincipalCV(proposal.proposal.split('.')[0], proposal.proposal.split('.')[1]);
		await openContractCall({
			network: getStacksNetwork(getConfig().VITE_NETWORK),
			postConditions: [],
			postConditionMode: PostConditionMode.Deny,
			contractAddress: deployer,
			contractName: proposal.contract.source.split('.')[1],
			functionName: 'conclude',
			functionArgs: [proposalCV],
			onFinish: (data) => {
				txId = data.txId;
				console.log('finished contract call!', data);
			},
			onCancel: () => {
				console.log('popup closed!');
			}
		});
	};
</script>

<svelte:head>
	<title>Ecosystem DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div>
	<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
		<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12 md:px-12">
			<div class="flex flex-col gap-y-12">
				{#if isPostVoting(proposal)}
					<div class="flex flex-col">
						<p class="mb-5 text-2xl">Voting ended</p>
						<p>Votes are now being counted.</p>
						<p>Vote results will be displayed as soon as the vote count is over.</p>
						<p>Thank you for your patience.</p>
					</div>
					{#if method === 3 && isConclusionPending(proposal)}
						<div>
							<button
								on:click={() => concludeVote()}
								class="focus-visible:outline-primary-500/50 shrink-0 items-center gap-x-1.5 rounded-xl border border-none bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex md:w-auto"
							>
								Conclude vote
							</button>
						</div>
					{/if}
				{:else}
					<div class="flex flex-col">
						<p class="mb-5 text-2xl">Results</p>
						<p>Votes will be counted and the results displayed here after voting ends.</p>
						<p>Thank you for your patience.</p>
					</div>
				{/if}

				{#if txId}
					<div>
						<a href={explorerTxUrl(txId)} target="_blank">Track progress on the explorer</a>
					</div>
				{/if}
			</div>
			<NakamotoBackground />
			<NakamotoShield />
		</div>
	</div>
</div>
