<script lang="ts">
	import { sessionStore } from '$stores/stores';
	import { onMount } from 'svelte';
	import { configStore } from '$stores/stores_config';
	import { type DaoTemplate, type ExtensionType } from '@mijoco/stx_helpers/dist/dao';
	import { getConfig, getDaoConfig } from '$stores/store_helpers';
	import { contractPrincipalCV, PostConditionMode } from '@stacks/transactions';
	import { fetchDataVar, getStacksNetwork, lookupContract } from '@mijoco/stx_helpers/dist/index';
	import { openContractCall } from '@stacks/connect';
	import { getBaseDaoExecutedProposalEvents, getCurrentProposalLink } from '../proposals/proposals';
	import Banner from '../ui/Banner.svelte';
	import Placeholder from '../ui/Placeholder.svelte';
	import NakamotoShield from '../ui/NakamotoShield.svelte';
	import NakamotoBackground from '../ui/NakamotoBackground.svelte';
	import { request } from '@stacks/connect';

	let inited = false;
	let constructed = false;
	const deployer_roles = [
		{
			secret_key: '753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601',
			stx_address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
			deployed: false,
			constructed: false
		}
	];

	const roles = deployer_roles;

	let errorMessage: string = '';
	let result: string | undefined = undefined;
	const account = $sessionStore.keySets[$configStore.VITE_NETWORK];
	$: explorerUrl = `${$configStore.VITE_STACKS_API}/txid/${result}?chain=${$configStore.VITE_NETWORK}`;

	const template: DaoTemplate = {
		deployer: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
		projectName: 'project_' + Math.floor(Math.random() * 1000),
		addresses: [],
		tokenName: undefined,
		tokenSymbol: undefined,
		tokenUrl: undefined
	};

	const useRegtest = () => {
		template.tokenName = 'Bitcoin DAO Governance Token';
		template.tokenSymbol = 'BDG';
		template.tokenUrl = 'http://localhost:8080/token/bdg';
		template.addresses.push('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
		template.addresses.push('ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5');
		template.addresses.push('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG');
		template.addresses.push('ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC');
	};

	let txId: string | undefined;

	const constructDao = async (addres: string) => {
		const deployer = addres || getDaoConfig().VITE_DOA_DEPLOYER;
		const contractName = getDaoConfig().VITE_DOA;
		const bootstrap = contractPrincipalCV(deployer, 'bdp000-bootstrap');
		// const bootstrap = contractPrincipalCV(deployer, 'edp010-set-phase1-extensions')
		const response = await request('stx_callContract', {
			contract: `${deployer}.${contractName}`,
			functionName: 'construct',
			functionArgs: [bootstrap],
			network: getConfig().VITE_NETWORK,
			postConditions: [],
			postConditionMode: 'allow'
		});
		console.log('response: ', response);
		txId = response.txid;
	};

	const launchDao = async (template: DaoTemplate) => {
		const path = `${getConfig().VITE_BRIDGE_API}/dao/v1/launch`;
		const response = await fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: '' },
			body: JSON.stringify(template)
		});

		if (response.status !== 200) {
			return {
				error: 'Error broadcasting',
				status: response.status
			};
		}
		return await response.json();
	};

	const launch = async () => {
		let key: keyof typeof template;
		for (key in template) {
			const value = template[key];
			if (!value || value.length === 0) errorMessage += '<br/>Value is required for ' + key;
		}
		const c = await lookupContract(getConfig().VITE_STACKS_API, `${template.deployer}.bitcoin-dao`);
		if (c && c.tx_id) errorMessage = 'Contracts already deployed for this deployer: ' + template.deployer;
		if (errorMessage) return;
		const result = await launchDao(template);
	};

	onMount(async () => {
		for (let obj of roles) {
			try {
				const c = await lookupContract(getConfig().VITE_STACKS_API, `${obj.stx_address}.bitcoin-dao`);
				if (c && c.tx_id) {
					obj.deployed = true;
					const events = await getBaseDaoExecutedProposalEvents(`${obj.stx_address}.bitcoin-dao`);
					obj.constructed = events && events.length > 0; //await fetchDataVar(getConfig().VITE_STACKS_API, template.deployer, 'bitcoin-dao', 'executive')
					constructed = obj.constructed;
				}
			} catch (err: any) {}
		}
		//constructed = await fetchDataVar(getConfig().VITE_STACKS_API, getDaoConfig().VITE_DOA_DEPLOYER, 'bitcoin-dao', 'executive');
		//const depl = roles.find((o: any) => o.stx_address === getDaoConfig().VITE_DOA_DEPLOYER);
		//if (depl) depl.constructed = constructed;
		inited = true;
	});
</script>

<svelte:head>
	<title>Ecosystem DAO</title>
	<meta name="description" content="Governance of the Stacks Blockchain, Smart Contracts on Bitcoin" />
</svelte:head>

<div class="relative mx-auto max-w-7xl py-6 md:px-6">
	{#if inited}
		<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
			<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12">
				<div class="bg-warning-01 flex flex-col gap-y-2">
					<div class="mb-4">
						<h2 class="mb-3 text-2xl text-[#131416]">DAO Launcher</h2>
					</div>
					<div class="relative mb-4 max-w-xl space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
						<div class="text-gray-900">
							<div class="flex flex-col gap-y-4">
								<div class="flex flex-col">
									<div class="text-xl">Template values</div>
									<div class="my-4 flex w-full flex-col justify-start gap-y-4 rounded-lg border border-gray-700 p-3">
										{#each roles as role}
											{#if role.deployed}
												<div class="flex flex-col gap-y-4">
													<div class="">
														Contract deployed {#if role.constructed}and constructed{/if}
													</div>
													<div class="">
														{role.stx_address + '.bitcoin-dao'}
													</div>
													{#if !role.constructed}
														<div>
															<button
																on:click={() => {
																	constructDao(role.stx_address);
																}}
																class="bg-success-01 focus-visible:outline-primary-500/50 w-[150px] items-center justify-center gap-x-1.5 rounded-xl border border-black bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
															>
																START DAO
															</button>
														</div>
													{/if}
												</div>
											{/if}
										{/each}
									</div>
								</div>
								{#if result}
									<div class="mb-3 max-w-xl">
										<Banner bannerType={'warning'} message={'Your contracts are being deployed. See <a href="' + explorerUrl + '" target="_blank">explorer!</a>' + result} />
									</div>
								{:else if constructed}
									<div class="mb-3 max-w-xl">
										<Banner bannerType={'info'} message={'Ensure the addresses are correct for network `' + $configStore.VITE_NETWORK + '`'} />
									</div>

									<div class="bottom-1 mb-5 flex w-full flex-col justify-start pb-5">
										<label for="project-name" class="text-blue-800">Project name</label>
										<input id="project-name" class="rounded-lg border-gray-800 p-2 text-black" bind:value={template.projectName} type="text" aria-describedby="projectName" />
									</div>

									<div class="mb-5 flex w-full flex-col justify-start text-blue-800">
										<label for="deployer">Deployer <span class="text-sm">(devnet wallet that will deploy and construct your dao)</span></label>
										<select class="h-10 w-full rounded-lg border px-3 text-black" bind:value={template.deployer}>
											{#each deployer_roles as deployer}
												<option value={deployer.stx_address}>{deployer.stx_address}</option>
											{/each}
										</select>
									</div>

									<div class="flex justify-between text-blue-800">
										<div class="text-xl"></div>
										<div class="text-sm">
											<a href="/" on:click|preventDefault={() => useRegtest()}>use regtest values</a>
										</div>
									</div>

									{#each Array(4) as _, i}
										<div class="flex w-full flex-col justify-start">
											<label for={'ct-' + i}>Core team member {i + 1}</label>
											<input id={'ct-' + i} class="rounded-lg border-gray-800 p-2 text-black" bind:value={template.addresses[i]} type="text" aria-describedby={template.addresses[i]} />
										</div>
									{/each}

									<div class="flex w-full flex-col justify-start">
										<label for="token-name">Token name</label>
										<input id="token-name" class="rounded-lg border-gray-800 p-2 text-black" bind:value={template.tokenName} type="text" aria-describedby="tokenName" />
									</div>
									<div class="flex w-full flex-col justify-start">
										<label for="token-symbol">Token symbol</label>
										<input id="token-symbol" class="rounded-lg border-gray-800 p-2 text-black" bind:value={template.tokenSymbol} type="text" aria-describedby="tokenSymbol" />
									</div>
									<div class="flex w-full flex-col justify-start">
										<label for="token-url">Token url</label>
										<input id="token-url" class="rounded-lg border-gray-800 p-2 text-black" bind:value={template.tokenUrl} type="text" aria-describedby="tokenUrl" />
									</div>
									<div class="flex w-full justify-start gap-x-4">
										<button
											on:click={() => {
												errorMessage = '';
												launch();
											}}
											class="bg-success-01 focus-visible:outline-primary-500/50 w-[150px] items-center justify-center gap-x-1.5 rounded-xl border border-black bg-black px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex"
										>
											LAUNCH DAO
										</button>
									</div>
									{#if errorMessage}
										<div class="flex w-full justify-start gap-x-4">
											{@html errorMessage}
										</div>
									{/if}
								{/if}
							</div>
						</div>
					</div>
				</div>
				<NakamotoBackground />
				<NakamotoShield />
			</div>
		</div>
	{:else}
		<!-- <Placeholder message={'holdingMessage'} link={name: 'getCurrentProposalLink()'} /> -->
	{/if}
</div>
