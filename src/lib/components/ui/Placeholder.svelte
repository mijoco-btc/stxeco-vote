<script lang="ts">
	import NakamotoBackground from './NakamotoBackground.svelte';
	import NakamotoShield from './NakamotoShield.svelte';

	export let message: string | undefined;
	export let link: { name: string; address: string };
</script>

<div class="mt-8 inline-block rounded-2xl border border-[#131416]/[12%] px-6 pb-1 pt-2">
	<div class="flex items-center gap-2">
		<span class="h-2 w-2 rounded-full bg-bloodorange"></span>
		<p class="font-mono text-xs uppercase tracking-wider text-bloodorange">
			{#if message}{@html message}{/if}
		</p>
	</div>
	<div class="my-1 h-2 animate-pulse rounded bg-sand-400"></div>
</div>
{#if link.address}
	<div class="mt-6 sm:flex sm:items-center sm:justify-between">
		<h1 class="text-2xl text-[#0A0A0B] sm:-mx-4 sm:text-4xl">
			<a href={link.address} class="rounded-md px-4 py-2" target="_blank">
				{@html link.name}
				<svg class="inline" width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M34.8958 27.6042L37.5 25C40.9518 21.5482 40.9518 15.9518 37.5 12.5C34.0482 9.04822 28.4518 9.04822 25 12.5L22.3958 15.1042" stroke="#0A0A0B" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M15.1042 22.3958L12.5 25C9.04822 28.4518 9.04822 34.0482 12.5 37.5C15.9518 40.9518 21.5482 40.9518 25 37.5L27.6042 34.8958" stroke="#0A0A0B" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M29.6875 20.3125L20.3125 29.6875" stroke="#0A0A0B" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		</h1>
	</div>
{/if}
<div class="my-8 flex w-full flex-row">
	<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
		<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12 md:px-12">
			<div>
				<div class="h-6 w-2/3 animate-pulse rounded bg-sand-600"></div>
				<div class="mt-6 h-2 animate-pulse rounded bg-sand-500"></div>
				<div class="mt-3 h-2 w-3/4 animate-pulse rounded bg-sand-500"></div>
				<div class="mt-3 h-2 w-2/3 animate-pulse rounded bg-sand-500"></div>
				<div class="mt-3 h-2 animate-pulse rounded bg-sand-500"></div>
			</div>
			<NakamotoBackground />
			<NakamotoShield />
		</div>
	</div>
</div>
