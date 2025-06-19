<script lang="ts">
	import { sessionStore } from '$stores/stores';
	import { openContractDeploy } from '@stacks/connect';
	import { daoStore } from '$stores/stores_dao';
	import { lookupContract, type InFlight } from '@mijoco/stx_helpers/dist/index';
	import type { DaoStore, FundingData, VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { getConfig, getDaoConfig } from '$stores/store_helpers';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Banner from '$lib/components/ui/Banner.svelte';
	import NakamotoBackground from '$lib/components/ui/NakamotoBackground.svelte';
	import FundingSubmission from '$lib/components/dao/proposals/FundingSubmission.svelte';
	import CoreSubmission from '$lib/components/dao/proposals/CoreSubmission.svelte';
	import ProposalDeploymentForm from '$lib/components/dao/proposals/ProposalDeploymentForm.svelte';

	const account = $sessionStore.keySets[getConfig().VITE_NETWORK];
	let contractId: string | null;
	let fundingData: FundingData | undefined;
	let contract: any | undefined;
	let fundedSubmission = true;
	const fundedSubmissionContractId = `${getDaoConfig().VITE_DOA_DEPLOYER}.${getDaoConfig().VITE_DOA_FUNDED_SUBMISSION_EXTENSION}`;
	const coreSubmissionContractId = `${getDaoConfig().VITE_DOA_DEPLOYER}.${'bde003-core-proposals'}`;

	let message: string | undefined;

	const processProposal = async (submission: boolean) => {
		if (!contractId) return;
		fundedSubmission = submission;
		message = 'Processing this proposal and adding to DAO';
		if (contractId) {
			contract = await lookupContract(getConfig().VITE_STACKS_API, contractId);
			if (contract && !contract.error) {
				fundingData = {
					funding: 0,
					parameters: {
						fundingCost: 500000,
						proposalDuration: 72,
						proposalStartDelay: 6
					}
				};
				message = 'ready to submit to dao';
			} else {
				message = 'Contract not found';
			}
		}
	};

	let canSubmit = true; //$settings.userProperties?.find((o) => o.functionName === 'edg-has-percentage-balance')?.value?.value || false;
	if (!canSubmit) {
		canSubmit = account.stxAddress === getDaoConfig().VITE_DOA_DEPLOYER;
	}
	let showNoop = false;
	let showFromFile = true;
	const contractSource = `
    ;; DAO: Ecosystem DAO
    ;; Title: <title>
    ;; Author: <author>
    ;; Synopsis: <synopsis>
    ;; Description: <description>

    (impl-trait '${getDaoConfig().VITE_DOA_DEPLOYER}.proposal-trait.proposal-trait)

    (define-public (execute (sender principal))
            (ok true)
    )
    `;
	let newProposal: VotingEventProposeProposal;
	let showDeployButton = false;
	let updated = false;
	let replacedSource = contractSource;
	let contractName = '';
	const addNewPoll = (e: { detail: { contractName: string; title: string; author: string; synopsis: string; description: string } }) => {
		contractName = e.detail.contractName;
		newProposal = {
			proposalMeta: { title: e.detail.title, author: '', dao: 'Ecosystem', description: '', synopsis: '' },
			proposer: account.stxAddress,
			funding: { funding: 0, parameters: { fundingCost: 0, proposalDuration: 0, proposalStartDelay: 0 } },
			status: { name: 'deploying', color: '', colorCode: '' },
			contractId: account.stxAddress + '.' + contractName,
			contract: {
				source: replacedSource,
				publish_height: 0
			}
		} as unknown as VotingEventProposeProposal;
		replacedSource = contractSource.replace('<title>', e.detail.title);
		replacedSource = replacedSource.replace('<author>', e.detail.author);
		replacedSource = replacedSource.replace('<synopsis>', e.detail.synopsis);
		replacedSource = replacedSource.replace('<description>', e.detail.description);
		showDeployButton = true;
		updated = true;
	};

	const fileLoaded = (e: { detail: { contractName: string; source: string } }) => {
		replacedSource = e.detail.source;
		contractName = e.detail.contractName;
		showDeployButton = true;
		newProposal = {
			proposalMeta: { title: contractName, author: '', dao: 'Ecosystem', description: '', synopsis: '' },
			proposer: account.stxAddress,
			funding: { funding: 0, parameters: { fundingCost: 0, proposalDuration: 0, proposalStartDelay: 0 } },
			status: { name: 'deploying', color: '', colorCode: '' },
			contractId: account.stxAddress + '.' + contractName,
			contract: {
				source: replacedSource,
				publish_height: 0
			}
		} as unknown as VotingEventProposeProposal;
	};

	let txId: string | undefined;
	const deployContract = async () => {
		await openContractDeploy({
			codeBody: replacedSource,
			contractName: contractName,
			onFinish: (data) => {
				daoStore.update((conf: DaoStore) => {
					if (!conf.daoData) conf.daoData = {} as InFlight;
					conf.daoData = {
						name: 'Deploy',
						txid: data.txId
					};
					return conf;
				});
			},
			onCancel: () => {
				console.log('popup closed!');
			}
		});
	};

	$: newSource = replacedSource;
	$: newSourceValid = replacedSource.indexOf(getDaoConfig().VITE_DOA_DEPLOYER + '.proposal-trait.proposal-trait') > -1 || account.stxAddress === getDaoConfig().VITE_DOA_DEPLOYER;
	$: explorerUrl = getConfig().VITE_STACKS_EXPLORER + '/txid/' + txId + '?chain=' + getConfig().VITE_NETWORK;

	onMount(async () => {
		contractId = $page.url.searchParams.get('tentativeCId');
		processProposal(true);
	});
</script>

<svelte:head>
	<title>Ecosystem DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div class="mx-auto max-w-7xl py-6 md:px-6">
	<div class="relative my-8 flex w-full overflow-hidden rounded-2xl bg-[#F4F3F0] px-10 py-10">
		<div class="w-full pe-10">
			<div class="flex gap-y-5">
				<h4 class="mb-3 text-2xl">New Proposals</h4>
			</div>

			{#if contract && contractId && fundingData}
				{#if fundedSubmission}
					<FundingSubmission {contractId} {fundingData} submissionContractId={fundedSubmissionContractId} />
				{:else}
					<CoreSubmission {contractId} {fundingData} submissionContractId={coreSubmissionContractId} />
				{/if}
			{:else}
				<div class="flex w-full flex-col gap-y-5">
					<p>Enter proposal contract id</p>
					<input bind:value={contractId} type="text" id="propose-contract" class="w-full rounded-md border p-3 text-black" />
					<div class="flex w-full gap-x-5">
						<button
							on:click={() => {
								processProposal(true);
							}}
							class="justify-startc bg-success-01 border-success-600 focus-visible:outline-primary-500/50 w-auto items-start gap-x-1.5 rounded-xl border bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Funded Submission
						</button>
						<button
							on:click={() => {
								processProposal(false);
							}}
							class="justify-startc bg-success-01 border-success-600 focus-visible:outline-primary-500/50 w-auto items-start gap-x-1.5 rounded-xl border bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
						>
							Core Submission
						</button>
					</div>
					{#if message}
						<div class="my-3">
							<Banner {message} />
						</div>
					{/if}
				</div>

				<div class="flex flex-col gap-y-5">
					{#if showNoop}
						<div class="flex flex-col">
							<div>
								<pre class="source-code">{newSource}</pre>
							</div>
							<div>
								{#if !showDeployButton}
									<ProposalDeploymentForm on:addNewPoll={addNewPoll} />
								{:else if txId}
									<div>
										<a href={explorerUrl} target="_blank">View on explorer</a>
									</div>
								{:else}
									<div class="mt-5 text-center">
										{#if newSourceValid}
											<p>Contract ready to be deployed - once its fully deployed crowd fund support for this proposal</p>
											<button
												class="btn btn-warning rounded"
												on:click|preventDefault={() => {
													deployContract();
												}}>Deploy proposal</button
											>
										{:else}
											<p class="bg-danger p-3">Contract is not ready to be deployed - please check the contract implements the trait correctly - using the full address given above.</p>
											<button disabled class="text-danger btn rounded">Proposal Trait Invalid</button>
										{/if}
									</div>
								{/if}
							</div>
						</div>
					{/if}
					<div>
						{#if txId}
							<div>
								<a href={explorerUrl} target="_blank">View on explorer</a>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
		<NakamotoBackground />
	</div>
</div>
