<script lang="ts">
	import { getPoxInfo, type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { onMount, tick } from 'svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PoxInfo } from '@mijoco/stx_helpers/dist/pox_types';
	import { getAllProposals } from '$lib/components/proposals/proposals';
	import BlockHeightConvertor from '$lib/components/dao/tools/BlockHeightConvertor.svelte';
	import RewardCycleConvertor from '$lib/components/dao/tools/PoxRewardSlotsAndConvertor.svelte';

	let proposals: Array<VotingEventProposeProposal> = [];
	let method = 1;
	let poxInfo: PoxInfo;
	let cycle = 0;
	let address: string | null;

	const changeMethod = async (e: any, newMethod: number) => {
		e.preventDefault();
		method = newMethod;
		$page.url.searchParams.set('tool', '' + method);

		//const url = new URL($page.url);
		// Set the new query parameter
		//url.searchParams.set('tool', method + '');
		history.pushState({}, '', $page.url);

		//goto(`?${$page.url.searchParams.toString()}`);
		const getMeTo = document.getElementById('tabs-header');
		await tick();
		if (getMeTo) getMeTo.scrollTo({ behavior: 'smooth' });
		return false;
	};

	const reset = () => {
		method = 1;
	};

	onMount(async () => {
		if ($page.url.searchParams.has('tool')) method = Number($page.url.searchParams.get('tool'));
		if ($page.url.searchParams.has('cycle')) cycle = Number($page.url.searchParams.get('cycle'));
		if ($page.url.searchParams.has('address')) address = $page.url.searchParams.get('cycle');
		proposals = await getAllProposals();
		poxInfo = await getPoxInfo(getConfig().VITE_STACKS_API);
	});
</script>

<svelte:head>
	<title>Proof of Transfer Tools</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div class="mx-auto max-w-7xl py-6 md:px-6">
	<div class="flex w-full flex-col">
		<div class="flex w-full flex-col gap-y-4 overflow-hidden rounded-lg border-[0.5px] border-gray-700 p-6 sm:p-10">
			<Tabs style="underline" contentClass="mb-0 pb-0 border-b-none">
				{#if poxInfo}
					<TabItem class="border-b-none relative top-[15px] rounded-t-lg border-l border-r border-t bg-lightgray text-black " open={method === 2} on:click={(e) => changeMethod(e, 2)} title="reward cycles">
						<div class="relative top-[-10px] bg-lightgray px-4 py-4">
							<RewardCycleConvertor {poxInfo} {cycle} />
						</div>
					</TabItem>
				{/if}
				<TabItem class="border-b-none relative top-[15px] rounded-t-lg border-l border-r border-t bg-lightgray text-black " open={method === 1} on:click={(e) => changeMethod(e, 1)} title="block height tool">
					<div class="relative top-[-10px] bg-lightgray px-4 py-4">
						<BlockHeightConvertor />
					</div>
				</TabItem>
			</Tabs>
		</div>
	</div>
</div>
