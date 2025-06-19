<script lang="ts">
	import { sessionStore } from '$stores/stores';
	import { FungibleConditionCode, PostConditionMode, contractPrincipalCV, someCV, uintCV } from '@stacks/transactions';
	import { openContractCall } from '@stacks/connect';
	import { onMount } from 'svelte';
	import type { FundingData } from '@mijoco/stx_helpers/dist/index';
	import { fetchStacksInfo, getStacksNetwork } from '@mijoco/stx_helpers/dist/stacks-node';
	import { getConfig } from '$stores/store_helpers';
	import { fmtMicroToStx, fmtNumber } from '$lib/utils';
	import { isLoggedIn } from '$lib/stacks/stacks-connect';
	import Countdown from '$lib/components/vote_counts/Countdown.svelte';
	import { getCurrentProposalLink } from '$lib/components/proposals/proposals';
	import Placeholder from '$lib/components/ui/Placeholder.svelte';
	import Holding from '$lib/components/vote_counts/Holding.svelte';

	export let fundingData: FundingData;
	export let contractId: string;
	export let submissionContractId: string;

	let errorMessage: string | undefined;
	let inited = false;
	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];

	let amount = 500000;
	let txId: string | undefined;

	let fundingMet = false;
	let proposalDuration = 0;
	let proposalStartDelay = 0;
	let startHeightMessage: string;
	let durationMessage: string;

	// const getSTXMintPostConds = function (amt: number) {
	// 	const postConds = [];
	// 	if (!account.stxAddress) return [];
	// 	const amount = amt; // ChainUtils.toOnChainAmount(amt, 0)
	// 	postConds.push(makeStandardSTXPostCondition(account.stxAddress, FungibleConditionCode.LessEqual, amount));
	// 	return postConds;
	// };

	const submitOriginal = async () => {
		if (amount < 500000) {
			return;
		}
		//const amountUSTX = ChainUtils.toOnChainAmount(amount);
		const amountCV = uintCV(amount);
		const customMajorityCV = someCV(uintCV(6600));
		const proposalCV = contractPrincipalCV(contractId.split('.')[0], contractId.split('.')[1]);
		let functionArgs = [proposalCV, amountCV, customMajorityCV];
		await openContractCall({
			network: getStacksNetwork(getConfig().VITE_NETWORK),
			postConditions: [], //getSTXMintPostConds(amount),
			postConditionMode: PostConditionMode.Allow,
			contractAddress: submissionContractId.split('.')[0],
			contractName: 'ede008-funded-proposal-submission-v5',
			functionName: 'fund',
			functionArgs: functionArgs,
			onFinish: async (data) => {
				txId = data.txId;
			},
			onCancel: () => {
				console.log('popup closed!');
			}
		});
	};

	const submitFlexible = async () => {
		if (!isLoggedIn()) {
			errorMessage = 'Please connect your wallet to vote';
			return;
		}
		if (proposalStartDelay < 2) {
			errorMessage = 'Start delay minimum is 2 blocks';
			return;
		}
		if (proposalStartDelay > 500) {
			errorMessage = 'Start delay maximum is 500 blocks';
			return;
		}
		if (proposalDuration < 3) {
			errorMessage = 'Duration minimum is 3 blocks';
			return;
		}
		if (proposalDuration > 15000) {
			errorMessage = 'Duration maximum is 5000 blocks';
			return;
		}
		if (amount < 500000) {
			errorMessage = 'Half a STX required to fund';
			return;
		}
		//const amountUSTX = ChainUtils.toOnChainAmount(amount);
		const amountCV = uintCV(amount);
		const paramStartDelayCV = uintCV(proposalStartDelay);
		const paramDurationCV = uintCV(proposalDuration);
		const customMajorityCV = someCV(uintCV(6600));
		const proposalCV = contractPrincipalCV(contractId.split('.')[0], contractId.split('.')[1]);
		let functionArgs = [proposalCV, paramStartDelayCV, paramDurationCV, amountCV, customMajorityCV];
		await openContractCall({
			network: getStacksNetwork(getConfig().VITE_NETWORK),
			postConditions: [], //getSTXMintPostConds(amount),
			postConditionMode: PostConditionMode.Allow,
			contractAddress: submissionContractId.split('.')[0],
			contractName: submissionContractId.split('.')[1],
			functionName: 'fund',
			functionArgs: functionArgs,
			onFinish: async (data) => {
				txId = data.txId;
			},
			onCancel: () => {
				console.log('popup closed!');
			}
		});
	};

	onMount(async () => {
		const stacksInfo = await fetchStacksInfo(getConfig().VITE_STACKS_API);
		const burnHeightNow = stacksInfo.burn_block_height;

		fundingMet = false;
		proposalDuration = fundingData.parameters.proposalDuration;
		proposalStartDelay = fundingData.parameters.proposalStartDelay;
		startHeightMessage = 'The earliest start for voting is in ' + proposalStartDelay + ' bitcoin blocks at ' + fmtNumber(burnHeightNow + proposalStartDelay);
		durationMessage = 'The voting window is ' + proposalDuration + ' blocks, roughly ' + (proposalDuration / 144).toFixed(2) + ' days, after voting starts.';
		inited = true;
	});

	$: explorerUrl = getConfig().VITE_STACKS_EXPLORER + '/txid/' + txId + '?chain=' + getConfig().VITE_NETWORK;
</script>

{#if inited}
	{#if !fundingMet}
		<div class="bg-warning-01 flex flex-col gap-y-2">
			<div class="mt-6 flex w-full flex-col gap-y-4">
				<div>
					<div>
						<p>{startHeightMessage}</p>
						<p>{durationMessage}</p>
						<p class="text-1xl">Fund proposal : {fmtMicroToStx(fundingData.parameters.fundingCost - fundingData.funding)} STX needed!</p>
					</div>
					<p class="text-sm font-thin">(minimum contribution is 0.5 STX)</p>
					{#if txId}
						<div>
							<a href={explorerUrl} target="_blank">View on explorer</a>
						</div>
					{/if}
				</div>
				<form on:submit|preventDefault class="form-inline">
					<div class="flex w-full flex-col gap-y-4">
						<div class="w-full">
							<div class={'readonly w-full rounded-lg border border-gray-400 bg-gray-500 px-2 py-1 text-xs text-white'} aria-describedby="Contribution">
								{contractId}
							</div>
						</div>
						<div class="w-full">
							<label class="block" for="start-block">voting will begin after</label>
							<input bind:value={proposalStartDelay} type="number" id="start-block" class={'h-[40px] w-60 rounded-lg border border-gray-400 px-2 py-1 text-black'} aria-describedby="Contribution" />
							<span class="text-sm text-[#131416]/[0.64]"><Countdown endBlock={proposalStartDelay} scaleFactor={1} /></span>
						</div>
						<div class="w-full">
							<label class="block" for="duration-block">voting open for minimum {proposalDuration} blocks</label>
							<input bind:value={proposalDuration} type="number" id="duration-block" class={'h-[40px] w-60 rounded-lg border border-gray-400 px-2 py-1 text-black'} aria-describedby="Contribution" />
							<span class="text-sm text-[#131416]/[0.64]"><Countdown endBlock={proposalStartDelay + proposalDuration} scaleFactor={1} /></span>
						</div>
						<div class="w-full">
							<label class="block" for="Contribution">funding required is {fundingData.parameters.fundingCost} uSTX</label>
							<input bind:value={amount} type="number" id="Contribution" class={'h-[40px] w-60 rounded-lg border border-gray-400 px-2 py-1 text-black'} aria-describedby="Contribution" />
						</div>
						<div>
							<button
								on:click={() => {
									submitFlexible();
								}}
								class="bg-success-01 border-success-600 focus-visible:outline-primary-500/50 w-52 shrink-0 items-center justify-center gap-x-1.5 rounded-xl border px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								Submit proposal
							</button>
						</div>
						{#if errorMessage}<div>{errorMessage}</div>{/if}
					</div>
				</form>
			</div>
		</div>
	{:else}
		<Holding />
	{/if}
{:else}
	<Placeholder message={'Vote info loading'} link={getCurrentProposalLink('Not Found')} />
{/if}
