<script lang="ts">
	import { onMount } from 'svelte';
	import Invoice from './Invoice.svelte';
	import type { StackerProposalData } from '@mijoco/stx_helpers/dist/index';
	import NakamotoResultsBackground from '$lib/components/ui/NakamotoResultsBackground.svelte';

	export let addresses: StackerProposalData;

	let yesAddress: string;
	let noAddress: string;
	let inited = false;

	onMount(async () => {
		yesAddress = addresses.bitcoinAddressYes as string;
		noAddress = addresses.bitcoinAddressNo as string;
		inited = true;
	});
</script>

{#if inited}
	<div class="relative rounded-2xl bg-[#F4F3F0] p-8">
		<Invoice address={yesAddress} voteFor={true} />
		<NakamotoResultsBackground />
	</div>

	<div class="relative rounded-2xl bg-[#F4F3F0] p-8">
		<Invoice address={noAddress} voteFor={false} />
		<NakamotoResultsBackground />
	</div>
{/if}
