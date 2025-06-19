<script lang="ts">
	import { onMount } from 'svelte';
	import Invoice from './Invoice.svelte';
	import { sessionStore } from '$stores/stores';
	import { request } from '@stacks/connect';
	import { getConfig } from '$stores/store_helpers';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers';
	import { getAddressId, isLoggedIn } from '$lib/stacks/stacks-connect';
	import { fmtNumber, fromMicroAmount } from '$lib/utils';

	export let proposal: VotingEventProposeProposal;
	export let onVotingEvent;
	let stackerData = proposal.stackerData!;
	export let lockedBalanceAtHeight: number;
	export let totalBalanceAtHeight: number;

	let height = proposal.stackerData?.heights?.stacksStart || proposal.proposalData?.startBlockHeight;

	let showStxTransfer = false;
	let txId: string;
	let errorMessage: string | undefined;
	let vforCurrent: boolean;
	let inited = false;

	const castVote = async (vfor: boolean) => {
		if (!isLoggedIn()) {
			vforCurrent = vfor;
			errorMessage = 'Please connect your wallet to vote';
			return;
		}
		const response = await request('stx_transferStx', {
			amount: '1', // amount in micro-STX (1 STX = 1,000,000 micro-STX)
			recipient: vfor ? stackerData.stacksAddressYes : stackerData.stacksAddressNo, // recipient address
			network: 'mainnet' // optional, defaults to mainnet
			// memo: 'Optional memo' // optional memo field
		});
		console.log('castVote response: ', response);

		// await openSTXTransfer({
		// 	amount: '1',
		// 	network: getStacksNetwork(getConfig().VITE_NETWORK),
		// 	recipient: vfor ? stackerData.stacksAddressYes : stackerData.stacksAddressNo,
		// 	onFinish: (data) => {
		// 		txId = data.txId;
		// 		console.log('finished contract call!', data);
		// 		localStorage.setItem('VOTED_FLAG' + getAddressId(), JSON.stringify(proposal.proposal));
		// 		localStorage.setItem('VOTED_TXID_2' + getAddressId(), txId);
		// 		onVotingEvent({ txId, event: 'pool' });
		// 	},
		// 	onCancel: () => {
		// 		console.log('popup closed!');
		// 	}
		// });
	};

	onMount(async () => {
		let locked = $sessionStore.keySets[getConfig().VITE_NETWORK].tokenBalances?.stx?.locked;
		locked = Number(locked);
		if (locked && locked > 0) showStxTransfer = true;
		inited = true;
	});
</script>

{#if inited}
	<div>
		{#if isLoggedIn()}
			{#if totalBalanceAtHeight <= 0}
				<div class="text-warning-700 mb-4 text-sm">
					Your balance at block height {fmtNumber(height)} was 0 - ie no voting power from the connected wallet.
				</div>
			{:else}
				<div class="mb-4 text-sm">
					Total voting power (in connected account): {fromMicroAmount(totalBalanceAtHeight)} STX (of which locked:
					{fromMicroAmount(lockedBalanceAtHeight)})
				</div>
			{/if}
		{/if}
		<div class="flex flex-col gap-x-3 gap-y-8">
			<div class="w-full rounded-2xl bg-[#F4F3F0] px-8 pt-8">
				{#if isLoggedIn() && totalBalanceAtHeight > 0}
					<div class="mb-8">
						<button
							on:click={() => {
								castVote(true);
							}}
							class="focus-visible:outline-black-500/50 block w-full rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Vote yes
						</button>
						{#if errorMessage && vforCurrent}
							<div class="mt-3 flex w-full justify-start gap-x-4">
								{errorMessage}
							</div>
						{/if}
					</div>
				{/if}
				<div class="mb-5">Or, send from stacking address in desktop wallet</div>
				<Invoice address={stackerData.stacksAddressYes} voteFor={true} />
			</div>

			<div class="w-full rounded-2xl bg-[#F4F3F0] px-8 pt-8">
				{#if isLoggedIn() && totalBalanceAtHeight > 0}
					<div class="mb-8">
						<button
							on:click={() => {
								castVote(false);
							}}
							class="focus-visible:outline-black-500/50 block w-full rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Vote no
						</button>
						{#if errorMessage && !vforCurrent}
							<div class="mt-3 flex w-full justify-start gap-x-4">
								{errorMessage}
							</div>
						{/if}
					</div>
				{/if}
				<div class="mb-5">Or, send from stacking address in desktop wallet</div>
				<Invoice address={stackerData.stacksAddressNo} voteFor={false} />
			</div>
		</div>
	</div>
{/if}
