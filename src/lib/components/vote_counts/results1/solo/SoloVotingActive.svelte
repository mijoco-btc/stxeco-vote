<script lang="ts">
	import { getConfig } from '$stores/store_helpers';
	import { sessionStore } from '$stores/stores';
	import { BitcoinNetworkType, sendBtcTransaction, type Recipient } from 'sats-connect';
	import { onMount } from 'svelte';
	import type { VotingEventProposeProposal } from '@mijoco/stx_helpers';
	import Invoice from './Invoice.svelte';
	import { isLeather, isLoggedIn } from '$lib/stacks/stacks-connect';
	import Banner from '$lib/components/ui/Banner.svelte';
	import NakamotoResultsBackground from '$lib/components/ui/NakamotoResultsBackground.svelte';

	export let proposal: VotingEventProposeProposal;
	export let onSwitchVotingMethod;
	let showOnPanel = false;

	const toggleVoting = () => {
		if (isLoggedIn()) {
			showPaymentButtons = !showPaymentButtons;
		}
	};

	const toggleMethod = (method: number) => {
		//dispatch('toggle_voting_method', { method });
	};

	const addresses = proposal.stackerData!;

	const castVote = async (vfor: boolean) => {
		if (!isLoggedIn()) {
			errorMessage = 'Please connect your wallet to vote';
			return;
		}
		if (isLeather()) {
			await castVoteLeather(vfor);
		} else {
			await castVoteXverse(vfor);
		}
	};

	const castVoteLeather = async (vfor: boolean) => {
		(window as any).btc
			?.request('sendTransfer', {
				address: vfor ? addresses?.bitcoinAddressYes : addresses?.bitcoinAddressNo,
				amount: 6000,
				network: getConfig().VITE_NETWORK
			})
			.then((resp: any) => {
				onSwitchVotingMethod({ txId: resp, event: 'pool' });
				console.log({ sucesss: resp });
			})
			.catch((error: any) => {
				console.log({ error });
			});
	};

	const castVoteXverse = async (vfor: boolean) => {
		const recipients: Recipient = {
			address: vfor ? addresses.bitcoinAddressYes : addresses.bitcoinAddressNo,
			amountSats: 6000n
		};
		const sendBtcOptions = {
			payload: {
				network: {
					type: getConfig().VITE_NETWORK === 'mainnet' ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet
				},
				recipients: [recipients],
				senderAddress: $sessionStore.keySets[getConfig().VITE_NETWORK].cardinal
			},
			onFinish: (response: any) => {
				alert(response);
			},
			onCancel: () => alert('Canceled')
		};

		await sendBtcTransaction(sendBtcOptions);
	};

	let errorMessage: string | undefined;
	let showPaymentButtons = false;

	let yesAddress: string;
	let noAddress: string;
	let inited = false;

	onMount(async () => {
		yesAddress = addresses.bitcoinAddressYes as string;
		noAddress = addresses.bitcoinAddressNo as string;
		inited = true;
	});
</script>

<div class="my-8 flex w-full flex-col">
	<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
		<div class="">
			<div class="mb-4">
				<h2 class="mb-3 text-2xl text-[#131416]">Bitcoin Voting (Solo Stackers Only!)</h2>
			</div>
			<div class="relative space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
				<p>Voters who are stacking on their own can vote by sending a dust amount of bitcoin (~6000 sats).</p>
				<p>Express your vote by sending a bitcoin transaction to either;</p>
				<ul class="mb-5 list-disc pl-6">
					<li>an address representing "Yes" to the proposal</li>
					<li>an address representing "No" to this proposal</li>
				</ul>
				<div class="relative rounded-lg bg-[#E6E4E2] py-3">
					<p>
						<a
							class="underline hover:text-blue-500"
							href="/"
							on:click|preventDefault={() => {
								toggleMethod(2);
							}}>Prefer to vote with a stacks transaction ?</a
						>
					</p>
				</div>
			</div>
			<div class="space-y-3 rounded-lg py-6">
				<Banner bannerType={'warning'} message={'Be sure to send the transaction from the same address that is registered as your reward address!'} />
			</div>

			<div class="mb-8 space-y-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
				<div class="rounded-2xl bg-[#121314] p-8">
					<h3 class="mb-5 text-3xl text-white">Cast your vote</h3>
					{#if isLoggedIn() && showOnPanel}
						<p class="mt-0 text-sm text-white">
							If you're stacking rewards are sent to the connected wallet <a href="/" on:click|preventDefault={() => (showPaymentButtons = !showPaymentButtons)} class="underline">click here</a>
						</p>
					{/if}
				</div>
				<div class="col-span-2">
					<div class="mb-5">
						{#if isLoggedIn()}
							<a
								class="relative top-[5px] inline-block underline"
								href="/"
								on:click|preventDefault={() => {
									toggleVoting();
								}}>Click here to send from connected wallet, if this is where you receive rewards</a
							>
						{/if}
					</div>
					<div class="flex flex-col gap-x-3 gap-y-8">
						<div class="relative w-full rounded-2xl bg-[#fff] px-8 pt-8">
							{#if showPaymentButtons}
								<div class="mb-8">
									<button
										on:click={() => {
											castVote(true);
										}}
										class="focus-visible:outline-black-500/50 block w-full rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
									>
										Vote yes
									</button>
								</div>
							{:else}
								<div class="mb-5">Send transaction from your reward address</div>
								<Invoice address={yesAddress} voteFor={true} />
								<NakamotoResultsBackground />
							{/if}
						</div>
						<div class="relative w-full rounded-2xl bg-[#fff] px-8 pt-8">
							{#if showPaymentButtons}
								<div class=" mb-8">
									<button
										on:click={() => {
											castVote(false);
										}}
										class="focus-visible:outline-black-500/50 block w-full rounded-md border border-none bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
									>
										Vote no
									</button>
								</div>
							{:else}
								<div class="mb-5">Send transaction from your reward address</div>
								<Invoice address={noAddress} voteFor={false} />
								<NakamotoResultsBackground />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
