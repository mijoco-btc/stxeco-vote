<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Pagination } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let totalEvents: number;
	export let limit: number;
	export let numPages: number;
	let inited = false;

	let pages: Array<{ name: string; href: string; active: boolean }> = [];

	$: activeUrl = page.url.searchParams.get('page');

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		const current = page.url.searchParams.has('page') ? Number(page.url.searchParams.get('page')) : 1;
		if (current <= 1) return;
		goto('/transactions?page=' + (current - 1));
	};
	const next = () => {
		const current = page.url.searchParams.has('page') ? Number(page.url.searchParams.get('page')) : 0;
		if (current >= numPages) return;
		goto('/transactions?page=' + (current + 1));
	};
	afterNavigate((nav) => {
		const mypage = page.url.searchParams.size === 0 ? 0 : Number(page.url.searchParams.get('page'));
		dispatch('fetch_page', { page: mypage - 1 });
	});

	onMount(async () => {
		let active = false;
		for (let i = 0; i < numPages; i++) {
			let name = Number(i + 1);
			if (i === 0 && page.url.searchParams.size === 0) active = true;
			else if (i + 1 === Number(page.url.searchParams.get('page'))) active = true;
			pages.push({ name: String(name), href: '/transactions?page=' + (i + 1), active });
			active = false;
		}
		inited = true;
	});
</script>

{#if totalEvents > 0 && inited}
	<Pagination
		{pages}
		on:previous={previous}
		on:next={next}
		normalClass="!bg-gray-1000 !dark:bg-gray-1000 !border-[0.5px] !border-gray-700 !hover:bg-gray-800 !dark:hover:bg-gray-800"
		activeClass="!dark:gray-700 !bg-primary-500/10 !border-[0.5px] !border-gray-700 !dark:bg-primary-500/10 !text-primary-500"
	>
		<svelte:fragment slot="prev">
			<span class="sr-only">Previous</span>
			<ChevronLeftOutline class="h-2.5 w-2.5" />
		</svelte:fragment>
		<svelte:fragment slot="next">
			<span class="sr-only">Next</span>
			<ChevronRightOutline class="h-2.5 w-2.5" />
		</svelte:fragment>
	</Pagination>
{/if}
