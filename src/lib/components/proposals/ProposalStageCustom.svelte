<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let message:string;

	const toggleProposals = () => {
		dispatch("toggle_proposal_listings");
	}

	onMount(async () => {
	})

</script>

<div class="inline-block pt-2 pb-1 px-6 rounded-2xl border border-[#131416]/[12%]">
	<div class="mb-1 flex items-center gap-2">
		<span class="w-2 h-2 rounded-full bg-bloodorange"></span>
		<p class="font-mono text-xs uppercase tracking-wider text-bloodorange">
			<a href="/" on:click={() => toggleProposals()} >{message}</a>
		</p>
	</div>
</div>
