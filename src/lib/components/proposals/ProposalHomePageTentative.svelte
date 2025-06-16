<script lang="ts">
	import BullsEye from '$lib/assets/home/BullsEye.svelte';
	import LinkInChainIcon from '$lib/assets/home/LinkInChainIcon.svelte';
	import { fmtNumber } from '$lib/utils';
	import { sessionStore } from '$stores/stores';
	import type { HeaderItem } from '@mijoco/stx_helpers/dist/index';
	import Countdown from '../vote_counts/Countdown.svelte';

	export let prop: any;
	export let infoItems: Array<HeaderItem>;
	let currentBurnHeight: number = $sessionStore.stacksInfo.burn_block_height;

	const getLink = () => {
		return '/dao/proposals/' + prop.tag + '/tentative';
	};
</script>

<div class="relative overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
	<!-- <NakamotoRelease/> -->
	<div class="relative z-[1] mt-4 sm:mt-0">
		<div class="mb-4">
			<h2 class="mb-3 text-xl text-[#131416]"><a href={getLink()}>{@html prop.proposalMeta.title} <LinkInChainIcon /></a></h2>
			<p class="text-lg text-[#605D5D]">{@html prop.proposalMeta.description.split('<br/>')[0]}</p>
		</div>

		<div class="flex flex-col justify-items-center gap-y-2">
			<div class="text-center text-sm">Bitcoin voting window: {fmtNumber(prop.expectedStart)} until {fmtNumber(prop.expectedEnd)}</div>
			<div class="text-center text-sm">Tentative start: <Countdown scaleFactor={1} endBlock={prop.expectedStart - currentBurnHeight} /></div>
		</div>

		{#if infoItems && infoItems.length > 0}
			<div class="pt-4">
				<h2 class="mb-3 text-xl text-[#131416]">Learn more</h2>
				<ul class="list-disc pl-4 text-[#605D5D]">
					{#each infoItems as item}
						<li><a class="underline" href={item.href} target={item.target}>{item.display}</a></li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	<BullsEye />
</div>
