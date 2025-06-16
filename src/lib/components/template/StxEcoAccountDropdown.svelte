<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { Icon, ClipboardDocument } from 'svelte-hero-icons';
	import { logUserOut } from '$lib/stacks/stacks-connect';
	import CopyClipboard from './CopyClipboard.svelte';
	import { makeFlash } from '@mijoco/stx_helpers/dist/index';
	import { truncate } from '$lib/utils';
	import LogoBitcoin from '$lib/assets/LogoBitcoin.svelte';
	import StacksIcon from '$lib/assets/StacksIcon.svelte';

	export let account: { stxAddress: string; cardinal: string };
	export let balances: { sbtcBalance?: string; cardinalBalance?: string; stacksBalance?: string };

	let copied = false;
	let dropdownOpen = false;

	const handleClick = (e: any) => {
		e.preventDefault();
		dropdownOpen = !dropdownOpen;
		//alert ('Clicked on: ' + e.target)
	};

	const copy = (event: any, ele: string, val: string) => {
		event.stopPropagation();
		//val = account.bnsNameInfo && account.bnsNameInfo.names && val === 'bns' ? account.bnsNameInfo.names[0] : val;
		let clippy = {
			target: document.getElementById('clipboard')!,
			props: { name: val }
		};
		const app = new CopyClipboard(clippy);
		app.$destroy();
		makeFlash(document.getElementById(ele));
		copied = true;
		return false;
	};

	const doLogout = async () => {
		logUserOut();
		window.location.reload();
	};

	const transformAddress = (address: string) => {
		if (address) {
			return truncate(address, 8);
		}
		return 'not connected';
	};
</script>

<div id="clipboard"></div>

<button
	on:click={(e) => handleClick(e)}
	class="focus-visible:outline-black-500/50 inline-flex w-full shrink-0 items-center justify-between gap-2 rounded-lg border border-transparent bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
>
	My account
	<svg class="inline h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
		<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
	</svg>
</button>
<Dropdown containerClass="w-80 z-30 rounded-lg !bg-black !border py-1 !border-transparent" placement="bottom-end">
	<div slot="header" class="overflow-hidden py-1 text-white">
		<div class="min-w-[200px] divide-y divide-sand-900">
			<div class="pb-2">
				<div class="px-4 py-2">Addresses</div>

				<div class="mb-2 text-sm">
					<div class="flex justify-between gap-4 px-4 py-2">
						<div class="flex flex-col gap-3 text-sm">
							<div id="icon-bns">
								<span><StacksIcon clazz={'w-5 h-5 inline mr-2'} /></span>
								<!-- {#if (account.bnsNameInfo?.names?.length || 0) > 0}<span>{account.bnsNameInfo?.names[0]}</span> :{/if}  -->
								<span>{transformAddress(account.stxAddress)}</span>
							</div>
						</div>
						<div class="flex items-center">
							<button
								on:click|preventDefault={(event) => copy(event, 'icon-bns', account.stxAddress)}
								class="focus-visible:outline-primary-500/50 flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-black transition duration-200 hover:border-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								<Icon on:keyup on:click={(event) => handleClick(event)} src={ClipboardDocument} class="h-5 w-5 text-white" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>

				<div class="mb-2 text-sm">
					<div class="flex justify-between gap-4 px-4 py-2">
						<div class="flex items-center gap-3 text-sm">
							<LogoBitcoin clazz={'w-5 h-5'} />
							<span id="icon-bitcoin1">{transformAddress(account.cardinal)}</span>
						</div>
						<div class="ml-auto flex items-center">
							<button
								on:click|preventDefault={(event) => copy(event, 'icon-bitcoin1', account.cardinal)}
								class="focus-visible:outline-primary-500/50 flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-black transition duration-200 hover:border-sand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
							>
								<Icon src={ClipboardDocument} class="h-5 w-5 text-white" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				<!--
				<div class="text-sm mb-2 ">
					<div class="px-4 py-2 flex gap-4 justify-between">
						<div id="icon-bitcoin2" class="flex items-center gap-3 text-sm">
							<LogoBitcoin clazz={'w-5 h-5'}/>
							<span>{transformAddress(account.ordinal)}</span>
						</div>
						<div class="ml-auto flex items-center">
							<button on:click|preventDefault={(event) => copy(event, 'icon-bitcoin2', account.ordinal)} class="h-8 w-8 rounded-md bg-black flex items-center justify-center border border-transparent hover:border-sand-900 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50">
								<Icon src="{ClipboardDocument}" class="h-5 w-5 text-white" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				-->
			</div>
			<div>
				<div class="mt-1 px-4 py-2">Balances</div>
				<div class="flex justify-between gap-4 px-4 py-2">
					<div class="flex items-center gap-3 text-sm">
						<StacksIcon clazz={'w-5 h-5'} />
						<span>STX</span>
					</div>
					<div class="ml-auto flex items-center">
						{balances.stacksBalance}
					</div>
				</div>

				<div class="flex justify-between gap-4 px-4 py-2">
					<div class="flex items-center gap-3 text-sm">
						<LogoBitcoin clazz={'w-5 h-5'} />
						<span>BTC</span>
					</div>
					<div class="ml-auto flex items-center">
						{balances.cardinalBalance}
					</div>
				</div>

				<!--
				<div class="px-4 py-2 flex gap-4 justify-between">
					<div class="flex items-center gap-3 text-sm">
						<LogoBitcoin clazz={'w-5 h-5'}/>
						<span>BTC (Ordinals)</span>
					</div>
					<div class="ml-auto flex items-center">
						{balances.ordinalBalance}
					</div>
				</div>
				<div class="px-4 py-2 flex gap-4 justify-between">
					<div class="flex gap-3 text-sm">
						<LogoSBTC class={'w-5 h-5'}/>
						<span>sBTC</span>
					</div>
					<div class="ml-auto flex items-center">
						{balances.sbtcBalance}
					</div>
				</div>
				-->
			</div>
		</div>
	</div>
	<DropdownItem defaultClass="px-4 py-2 text-error-500 hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/50" on:click={() => doLogout()}>Disconnect wallet</DropdownItem>
</Dropdown>
