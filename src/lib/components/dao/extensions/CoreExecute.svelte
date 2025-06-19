<script lang="ts">
	import { showContractCall } from '@stacks/connect';
	import { PostConditionMode, contractPrincipalCV } from '@stacks/transactions';
	import { getStacksNetwork, lookupContract } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';


  let txId: string;
  let contractId: string;
  $: buttonLabel = (txId) ? "Tx Sent": "SUPPORT PROPOSAL";

  const signalSupport = async () => {
    if (!contractId) return;
    const deployer = getConfig().VITE_DOA_DEPLOYER;
    const proposalCV = contractPrincipalCV(contractId.split('.')[0], contractId.split('.')[1])
    await showContractCall({
      network: getStacksNetwork(getConfig().VITE_NETWORK),
      postConditions: [],
      postConditionMode: PostConditionMode.Deny,
      contractAddress: deployer,
      contractName: 'bde004-core-execute',
      functionName: 'executive-action',
      functionArgs: [proposalCV],
      onFinish: data => {
        txId = data.txId;
        console.log('finished contract call!', data);
      },
      onCancel: () => {
        console.log('popup closed!');
      },
    });
  }

  //const executiveTeamMember = isExecutiveTeamMember($sessionStore.keySets[getConfig().VITE_NETWORK].stxAddress)
  const explorerUrl = () => {
	  return `${getConfig().VITE_STACKS_EXPLORER}/txid/${txId}?chain=${getConfig().VITE_NETWORK}&api=${getConfig().VITE_STACKS_API}`;
  }

  let deployed = false
	const checkDeployed = async (contractId:string) => {
		const result = await lookupContract(getConfig().VITE_STACKS_API, contractId)
    deployed = typeof result !== undefined
	}

</script>

	<div class="my-5 bg-sand-300 rounded-md p-3">
    <div class="row">
      <div>
        <div class="text-small">Send signal</div>

        <div class="w-full flex flex-col justify-start my-4">
          <label for="token-name">Proposal contract</label>
          <input id="token-name" class="rounded-lg p-2 text-black border-gray-800" bind:value={contractId} on:change={() => checkDeployed(contractId)} type="text" aria-describedby="tokenName"/>
        </div>

        {#if !txId && deployed}
        <button on:click={() => signalSupport()} class="justify-center w-[150px] md:inline-flex items-center gap-x-1.5 bg-success-01 px-4 py-2 rounded-xl border border-black bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50">
          {buttonLabel}
        </button>
        {/if}
      </div>
      {#if txId}
      <div>
        <a href={explorerUrl()} target="_blank">View on explorer</a>
      </div>
      {/if}
    </div>
  </div>

<style>
  p {
	color: #ededed;
}

</style>
