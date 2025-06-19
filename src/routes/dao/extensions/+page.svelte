<script lang="ts">
	import type { DaoEventEnableExtension, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig, getDaoConfig } from '$stores/store_helpers';
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { getExtensions, readBaseDaoEvents } from '$lib/components/vote_counts/voting_api';
	import { getAllProposals } from '$lib/components/proposals/proposals';
	import { isCoordinator } from '$lib/stacks/stacks-connect';
	import Banner from '$lib/components/ui/Banner.svelte';
	import BlockHeightConvertor from '$lib/components/dao/tools/BlockHeightConvertor.svelte';
	import { readStackerEvents, readVotingContractEvents } from '$lib/components/dao/voting-stacker';
	import ExtensionGridItem from '$lib/components/dao/extensions/ExtensionGridItem.svelte';
	import ProposalGridItem from '$lib/components/dao/extensions/ProposalGridItem.svelte';
	import CoreExecute from '$lib/components/dao/extensions/CoreExecute.svelte';

	const daoBaseContracts = getDaoConfig().VITE_DAO_BASE_CONTRACTS.split(',') || [];
	let thisBaseDao = 'bitcoin-dao';
	let extensions: Array<DaoEventEnableExtension> = [];
	let proposals: Array<VotingEventProposeProposal> = [];
	let operation = 0;
	let item: any;
	let sourceCode: string;
	let showModal = false;
	let message: string | undefined;

	const openSourceModal = (evt: any) => {
		item = evt.detail;
		sourceCode = item.contract?.source;
	};
	const readDaoEvents = async () => {
		await readBaseDaoEvents(`${getDaoConfig().VITE_DOA_DEPLOYER}.${thisBaseDao}`);
		extensions = await getExtensions(`${getDaoConfig().VITE_DOA_DEPLOYER}.${thisBaseDao}`);
		operation = 0;
	};
	const updateExtensions = async (e?: any) => {
		extensions = await getExtensions(`${getDaoConfig().VITE_DOA_DEPLOYER}.${thisBaseDao}`);
	};

	onMount(async () => {
		try {
			await updateExtensions();
			proposals = await getAllProposals();
		} catch (err) {}
	});
</script>

<svelte:head>
	<title>Base DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<!-- <Modal {showModal} on:click={() => showModal = !showModal}>
        <div class="source-modal"><ClaritySytaxHighlighter {sourceCode} /></div>
        <div slot="title">
            <h3>Extension: {item.contractId.split('.')[1]}</h3>
        </div>
    </Modal> -->

<div class="mx-auto max-w-7xl py-6 md:px-6">
	<div class="my-8 flex w-full flex-col">
		<div class="flex w-full flex-col gap-y-4 overflow-hidden rounded-lg border-[0.5px] border-gray-700 p-6 sm:p-10">
			<h1 class=" text-2xl">DAO Extensions</h1>
			<p class="strapline">
				The toolkit of the DAO. The active extensions are the mechanics of the DAO. They define how the internals work, governing everything from proposal submission to voting to governance to treasury management. We name the extension contracts
				according to the convention BDEXXX where BDE stands for Bitcoin DAO Extension and XXX is the extension number
			</p>
			{#if isCoordinator($sessionStore.keySets[getConfig().VITE_NETWORK].stxAddress)}
				<ul>
					<li>
						<a
							href="/"
							on:click|preventDefault={() => {
								readDaoEvents();
							}}>read dao events</a
						>
					</li>
					<li>
						<a
							href="/"
							on:click|preventDefault={() => {
								operation = 1;
							}}>core team execute</a
						>
					</li>
					<li>
						<a
							href="/"
							on:click|preventDefault={() => {
								operation = 2;
							}}>show proposals</a
						>
					</li>
					<li>
						<a
							href="/"
							on:click|preventDefault={() => {
								operation = 3;
							}}>block height tool</a
						>
					</li>
					<li><a href="/dao/proposals/propose">make proposals</a></li>
				</ul>
			{/if}

			{#if message}<div class="my-5"><Banner bannerType={'warning'} {message} /></div>{/if}

			<div class="mb-5 flex w-full flex-col text-base font-extralight">
				<label for="period">Select base dao</label>
				<select class="h-10 w-full rounded-lg border px-3 text-black" bind:value={thisBaseDao} on:change={(e) => updateExtensions(e)}>
					{#each daoBaseContracts as baseDao}
						<option value={baseDao} selected={baseDao === thisBaseDao}>{baseDao}</option>
					{/each}
				</select>
			</div>
			{#if operation === 0}
				<div class="w-full justify-stretch border-b border-dashed">
					Extensions for {thisBaseDao}
				</div>
				{#each extensions as extension}
					<div class="grid w-full grid-cols-6 justify-stretch"><ExtensionGridItem {extension} /></div>
				{/each}
			{:else if operation === 1}
				<CoreExecute />
			{:else if operation === 2}
				<div class="w-full justify-stretch border-b border-dashed">
					Proposals for {thisBaseDao}
				</div>
				{#each proposals as proposal}
					<div class="grid w-full grid-cols-6 justify-stretch"><ProposalGridItem {proposal} /></div>
				{/each}
			{:else if operation === 3}
				<BlockHeightConvertor />
			{/if}
		</div>
	</div>
</div>
