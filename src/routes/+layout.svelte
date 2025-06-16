<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { isLocalhost, sessionStore, type BigMarketSessionStore } from '../stores/stores';
	import { beforeNavigate, configStore, switchConfig } from '../stores/stores_config';
	import { addresses, getStxAddress, isLoggedIn } from '$lib/stacks/stacks-connect';
	import { page } from '$app/state';
	import { fetchStacksInfo, getTokenBalances, getWalletBalances, initAddresses, type ExchangeRate, type StacksInfo } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import HeaderFromComponents from '$lib/components/template/HeaderFromComponents.svelte';
	import StxEcoFooter from '$lib/components/template/StxEcoFooter.svelte';
	import InFlightTransaction from '$lib/components/template/InFlightTransaction.svelte';
	import Placeholder from '$lib/components/ui/Placeholder.svelte';
	import { getCurrentProposalLink, isExecutiveTeamMember } from '$lib/components/proposals/proposals';

	export let data: {
		exchangeRates: ExchangeRate[];
		stacksInfo: StacksInfo;
		network: string;
	};
	let componentKey = 0;
	let holdingMessage = 'Waiting for voting information to load';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	const unsubscribe3 = configStore.subscribe(() => {});
	let inited = false;
	// Set the config globally
	switchConfig(data.network);

	onDestroy(async () => {
		unsubscribe1();
		unsubscribe3();
	});

	isLocalhost.set(page.url.hostname.indexOf('localhost') > -1);

	const initApp = async () => {
		const ticker = setInterval(async function () {
			const stacksInfo = (await fetchStacksInfo(getConfig().VITE_STACKS_API)) || ({} as StacksInfo);
			sessionStore.update((conf: BigMarketSessionStore) => {
				conf.stacksInfo = stacksInfo;
				return conf;
			});
		}, 60000);
	};

	onMount(async () => {
		initAddresses(sessionStore);
		sessionStore.update((conf) => ({
			...conf,
			stacksInfo: data.stacksInfo,
			exchangeRates: data.exchangeRates,
			userSettings: {
				executiveTeamMember: false
			}
		}));
		initApp();
		inited = true;
		if (isLoggedIn()) {
			try {
				const obj = await addresses();
				obj.tokenBalances = await getTokenBalances(getConfig().VITE_STACKS_API, obj.stxAddress);
				obj.walletBalances = await getWalletBalances(getConfig().VITE_STACKS_API, getConfig().VITE_MEMPOOL_API, obj.stxAddress, obj.cardinal, obj.ordinal);

				const userSettings = await isExecutiveTeamMember(getStxAddress());

				sessionStore.update((conf) => ({
					...conf,
					keySets: {
						...conf.keySets,
						[getConfig().VITE_NETWORK]: obj
					},
					userSettings: {
						...conf.userSettings,
						executiveTeamMember: userSettings?.executiveTeamMember || false
					}
				}));
			} catch (err) {
				console.error('Error loading user data: ', err);
			}
		}

		window.addEventListener('popstate', (event) => {
			beforeNavigate({ url: new URL(window.location.href) });
		});
	});
</script>

<div class="relative flex min-h-screen flex-col bg-white">
	{#key componentKey}
		{#if inited}
			<div class="w-full"><HeaderFromComponents /></div>
		{/if}
	{/key}
	<div class=" relative grow px-6">
		{#if inited}
			<InFlightTransaction />
			{#key componentKey}
				<slot></slot>
			{/key}
		{:else}
			<div class="mx-auto max-w-7xl py-4 md:px-6">
				<div class="my-8 flex w-full flex-col">
					<Placeholder message={holdingMessage} link={getCurrentProposalLink('Loading')} />
				</div>
			</div>
		{/if}
	</div>
	<div class="w-full"><StxEcoFooter /></div>
</div>
