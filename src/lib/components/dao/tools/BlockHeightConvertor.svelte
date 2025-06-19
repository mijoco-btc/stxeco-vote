<script lang="ts">
	import { getConfig } from '$stores/store_helpers';
	import { sessionStore } from '$stores/stores';
	import { fetchBlockAtHeight } from '@mijoco/btc_helpers/dist/index';
	import { getStacksHeightFromBurnBlockHeight } from '@mijoco/stx_helpers/dist/index';
	import { onMount } from 'svelte';

	let currentBurnHeight: number = $sessionStore.stacksInfo.burn_block_height;
	let currentBlock: any;
	let newHeight: number = currentBurnHeight;
	let bitcoinBlock: any;
	let stacksBlock: any;
	$: blockHeightDiff = newHeight - currentBurnHeight;

	const fetchBitcoinBlock = async () => {
		try {
			bitcoinBlock = await fetchBlockAtHeight(getConfig().VITE_MEMPOOL_API, newHeight);
			stacksBlock = await getStacksHeightFromBurnBlockHeight(getConfig().VITE_STACKS_API, newHeight);
		} catch (err: any) {}
		if (!bitcoinBlock) {
			const blocksToMine = newHeight - currentBurnHeight;
			bitcoinBlock = {
				timestamp: currentBlock.timestamp + blocksToMine * 10 * 60
			};
		}
	};

	onMount(async () => {
		currentBlock = await fetchBlockAtHeight(getConfig().VITE_MEMPOOL_API, newHeight);
		fetchBitcoinBlock();
	});
</script>

<div class="my-5 rounded-md p-3">
	<div class="row">
		<div class="text-gray-900">
			<div class="my-4 flex w-full flex-col justify-start">
				<label for="token-name" class="w-auto">Current bitcoin height {currentBurnHeight}:</label>
				<div class="my-4 flex w-full justify-start">
					<div class="me-2"><input id="token-name" class="rounded-lg border-gray-800 p-2 text-black" bind:value={newHeight} type="text" aria-describedby="tokenName" /></div>
					<button
						on:click={() => {
							fetchBitcoinBlock();
						}}
						class="justify-startc bg-success-01 border-success-600 focus-visible:outline-primary-500/50 w-auto items-start gap-x-1.5 rounded-xl border bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						go
					</button>
				</div>
			</div>

			{#if bitcoinBlock}
				{#if currentBurnHeight - newHeight < 0}
					<div class="my-4 flex w-full flex-col justify-start">
						{newHeight - currentBurnHeight} blocks in the future
					</div>
				{/if}
				<div class="my-4 flex w-full flex-col justify-start">
					{new Date(bitcoinBlock.timestamp * 1000)}
				</div>
			{/if}

			{#if stacksBlock && stacksBlock > -1}
				<div class="my-4 flex w-full flex-col justify-start">
					Stacks block height: {stacksBlock}
				</div>
			{/if}
		</div>
	</div>
</div>
