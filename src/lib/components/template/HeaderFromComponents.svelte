<script lang="ts">
	import { onMount } from 'svelte';
	import { fmtMicroToStx, fmtNumber, fmtSatoshiToBitcoin } from '$lib/utils';
	import { sessionStore } from '$stores/stores';
	import { getConfig } from '$stores/store_helpers';
	import { getBalances, type AddressObject, type HeaderLink } from '@mijoco/stx_helpers/dist/index';
	import { goto } from '$app/navigation';
	import { appDetails } from '$lib/config';
	import { authenticate, getAddressId, getBtcAddress, getBtcBalance, getStxAddress, getStxBalance, isCoordinator, isLoggedIn, logUserOut } from '$lib/stacks/stacks-connect';
	import { getRouterInfo } from './template';
	import StxEcoHeader from './StxEcoHeader.svelte';

	let keys = $sessionStore.keySets ? $sessionStore.keySets[getConfig().VITE_NETWORK] : undefined;
	let loggedIn = isLoggedIn();
	let inited = false;

	const loginStacks = async () => {
		authenticate(function () {
			window.location.reload();
		});
	};

	$: heights = {
		stacksHeight: fmtNumber($sessionStore?.stacksInfo?.stacks_tip_height || 0) || '0',
		bitcoinHeight: fmtNumber($sessionStore?.stacksInfo?.burn_block_height || 0) || '0'
	};
	$: account = {
		stxAddress: getStxAddress(),
		cardinal: getBtcAddress()
	};
	$: balances = {
		cardinalBalance: fmtSatoshiToBitcoin(getBtcBalance()) || '0',
		// ordinalBalance: fmtSatoshiToBitcoin($sessionStore.keySets[getConfig().VITE_NETWORK]?.walletBalances?.ordinal.amount!) || '0',
		stacksBalance: fmtMicroToStx(getStxBalance()) || '0'
	};

	let headerLinks: Array<HeaderLink> = [];
	getRouterInfo(headerLinks, '/tools');
	if (isLoggedIn() && isCoordinator(getStxAddress())) {
		getRouterInfo(headerLinks, '/admin');
		//getRouterInfo(headerLinks, '/dao-launcher')
		//getRouterInfo(headerLinks, '/proposals')
	}

	const logoutEvent = () => {
		logUserOut();
		localStorage.removeItem('VOTED_FLAG' + getAddressId());
		localStorage.removeItem('VOTED_TXID_2' + getAddressId());
		localStorage.removeItem('VOTED_TXID_3' + getAddressId());
		//localStorage.removeItem('STX_PROVIDER');
		loggedIn = isLoggedIn();
		$sessionStore.keySets['mainnet'] = {} as AddressObject;
		$sessionStore.keySets['testnet'] = {} as AddressObject;
		$sessionStore.keySets['devnet'] = {} as AddressObject;
		sessionStore.update(() => $sessionStore);

		setTimeout(function () {
			goto('/');
		}, 100);
	};

	const networkSwitchEvent = async () => {};

	onMount(async () => {
		try {
			console.log('keys: ', keys);
			account = {
				stxAddress: getStxAddress(),
				cardinal: getBtcAddress()
			};
			inited = true;
		} catch (err) {
			console.log(err);
		}
	});
</script>

{#if inited}
	<StxEcoHeader {headerLinks} {loggedIn} {heights} {account} {balances} on:do_login={loginStacks} on:do_logout={logoutEvent} on:switch_network={networkSwitchEvent} />
{/if}
