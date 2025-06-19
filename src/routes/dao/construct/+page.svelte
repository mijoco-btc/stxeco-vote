<script lang="ts">
	import ConstructDao from '$lib/components/dao/ConstructDao.svelte';
	import { isLoggedIn } from '$lib/stacks/stacks-connect';
	import { onMount } from 'svelte';

	onMount(async () => {});
</script>

<svelte:head>
	<title>Ecosystem DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

{#if isLoggedIn()}
	<ConstructDao />
{/if}
