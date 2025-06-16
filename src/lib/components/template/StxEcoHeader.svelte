<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem } from 'flowbite-svelte';
	import Brand from './StxEcoBrand.svelte';
	import AccountDropdown from './StxEcoAccountDropdown.svelte';
	import { page } from '$app/state';
	import { CheckCircle, Icon } from 'svelte-hero-icons';
	import { authenticate } from '$lib/stacks/stacks-connect';

	export let headerLinks;
	export let loggedIn = false;
	export let heights: { stacksHeight: string; bitcoinHeight: string };
	export let account: { stxAddress: string; cardinal: string };
	export let balances: { sbtcBalance?: string; cardinalBalance?: string; stacksBalance?: string };

	let component;

	let dropdownOpen = false;

	const handleClick = (e: any) => {
		e.preventDefault();
		dropdownOpen = !dropdownOpen;
		//alert ('Clicked on: ' + e.target)
	};

	const doLogin = async () => {
		authenticate(function () {
			window.location.reload();
		});
	};

	// const switchNetwork = async (network: string) => {
	// 	dispatch('switch_network', { newNetwork: network });
	// };

	const getNavActiveClass = (item: string) => {
		if (page.route.id && page.route.id.indexOf(item) > -1)
			return ' text-base text-primary-500 !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50';
		return ' text-base !px-4 !py-2 rounded-lg hover:bg-white/[8%] focus:bg-white/[16%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50';
	};
</script>

<Navbar class="relative mx-auto flex max-w-7xl items-center !bg-transparent !px-6 lg:px-8" let:hidden let:toggle fluid={true}>
	<NavBrand href="/">
		<div class="brand"><Brand /></div>
	</NavBrand>

	<div class="hidden md:order-3 md:flex md:gap-2">
		{#if loggedIn}
			<AccountDropdown {account} {balances} />
		{:else}
			<button
				bind:this={component}
				on:click={doLogin}
				on:keydown={doLogin}
				class="focus-visible:outline-black-500/50 inline-flex shrink-0 items-center rounded-lg border border-transparent bg-[#131416] px-4 py-2 font-mono text-sm uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				Connect wallet&nbsp;<span class="text-[#FDFDFC]/[0.64]">-&gt;</span>
			</button>
		{/if}
	</div>

	<NavHamburger class="text-black hover:bg-sand-900 hover:text-white" on:click={toggle} />

	<NavUl {hidden} class="md:flex-0 order-1" ulClass="dark:bg-white dark:md:bg-white md:border-0 border border-black flex flex-col p-2 md:p-4 mt-4 md:flex-row md:mt-0 md:text-sm md:!md:space-x-4 sm:justify-end md:text-sand-700 py-2.5 px-2">
		<div class="flex">
			{#each headerLinks as link}
				{#if link.items}
					<NavLi nonActiveClass={getNavActiveClass(link.name)} on:click={(e) => handleClick(e)}>
						<a href="/" on:click|preventDefault={() => {}}>{link.display}</a>
						<svg class="inline h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
							<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
						</svg>
					</NavLi>
					<Dropdown containerClass="z-30 rounded-lg !bg-black text-white !border py-1 !border-[#131416]/[0.16]" placement="bottom-start">
						{#each link.items as item}
							<DropdownItem defaultClass="text-white relative hover:bg-sand-300/50 pl-12 pr-4 py-2  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/50">
								<Icon src={CheckCircle} mini class="absolute left-4 top-1/2 inline h-6 w-6 -translate-y-1/2 text-sand-800" aria-hidden="true" />
								<NavLi nonActiveClass={getNavActiveClass(item.name)}><a href={item.href} target={item.target || '_self'}>{item.display}</a></NavLi>
							</DropdownItem>
						{/each}
					</Dropdown>
				{:else}
					<NavLi nonActiveClass={getNavActiveClass(link.name)}><a href={link.href} target={link.target || '_self'}>{link.display}</a></NavLi>
				{/if}
			{/each}
		</div>
	</NavUl>
	<NavUl {hidden} class="order-1 md:flex-1" ulClass="dark:bg-white dark:md:bg-white md:border-0 border border-black flex flex-col p-2 md:p-4 mt-4 md:flex-row md:mt-0 md:text-sm md:!md:space-x-4 sm:justify-end md:text-sand-700 py-2.5 px-2">
		<li>
			<div>
				<span role="contentinfo" class="inline-flex items-center gap-3 px-2 py-2.5 md:text-sand-700">
					Block height:
					<span class="inline-flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
							><path
								fill="#101010"
								d="m14.8897 16.0001-2.546-3.8575H16v-1.4554H4v1.4571h3.65512l-2.54485 3.8558h1.8986L10 11.4681l2.9911 4.532h1.8986ZM16 9.27468V7.80464h-3.582L14.929 4h-1.8986L9.99997 8.59149 6.96957 4H5.07099l2.51428 3.80805H4v1.46663h12Z"
							/></svg
						>
						{heights.stacksHeight}
					</span>
					<span class="inline-flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
							><path
								fill="#101010"
								d="M15.549 8.62826c.22-1.47106-.9-2.26187-2.4315-2.78942l.4968-1.99275-1.213-.3023-.4837 1.94023c-.3189-.07946-.6464-.15442-.9718-.2287l.4871-1.95302L10.2206 3l-.49716 1.99205c-.26395-.06011-.52306-.11953-.77458-.18206l.00139-.00622-1.67282-.4177-.32268 1.29556s.89998.20626.88097.21904c.49128.12265.58007.44774.56521.70547l-.5659 2.27018c.03386.00863.07774.02107.12611.04042-.04042-.01002-.08361-.02108-.12818-.03179l-.79323 3.18015c-.06012.1493-.21247.3731-.55588.2882.01209.0176-.88167-.2201-.88167-.2201L5 13.5217l1.57851.3935c.29366.0736.58144.1506.86474.2232l-.50198 2.0155 1.21161.3023.49715-1.9941c.33097.0898.65227.1727.96666.2508l-.49542 1.9848L10.3343 17l.5019-2.0117c2.0684.3914 3.6238.2335 4.2785-1.6373.5276-1.5063-.0263-2.3752-1.1145-2.9418.7925-.1827 1.3895-.70407 1.5488-1.78094Zm-2.7715 3.88634c-.3748 1.5063-2.91103.692-3.73328.4878l.66609-2.6702c.82229.2052 3.45899.6115 3.06719 2.1824Zm.3752-3.90811c-.342 1.37019-2.4529.67404-3.1377.50337l.6039-2.42183c.6848.17067 2.89.4892 2.5338 1.91846Z"
							/></svg
						>
						{heights.bitcoinHeight}
					</span>
				</span>
			</div>
		</li>

		<NavLi nonActiveClass="md:hidden" class="-ml-2 -mr-3">
			{#if loggedIn}
				<AccountDropdown {account} {balances} />
			{:else}
				<button
					bind:this={component}
					on:click={doLogin}
					on:keydown={doLogin}
					id="connect-wallet"
					class="block w-full items-center gap-x-1.5 rounded-lg border border-transparent bg-[#131416] px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#131416]"
				>
					Connect wallet
				</button>
			{/if}
		</NavLi>
	</NavUl>
</Navbar>
