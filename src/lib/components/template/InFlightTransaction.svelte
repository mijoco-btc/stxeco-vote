<script lang="ts">
	import { onMount } from 'svelte';
	import type { DaoStore } from '@mijoco/stx_helpers/dist/index';
	import { getTransaction, type InFlight } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';
	import { explorerTxUrl } from '$lib/stacks/stacks-connect';
	import { daoStore } from '$stores/stores_dao';

	let status: string = 'pending';
	const getMessage = (inFlight: any) => {
		return `${inFlight.name} transaction sent (status ${status}) - <a href="${explorerTxUrl(inFlight.txid)}" target="_blank"> view on explorer</a>`;
	};

	onMount(async () => {
		if ($daoStore.daoData) {
			const txid = $daoStore.daoData?.txid;
			if (typeof txid === 'string') {
				const myint = setInterval(async () => {
					const tx = await getTransaction(getConfig().VITE_STACKS_API, txid);
					status = tx.tx_status;
					if (tx.tx_status === 'success') {
						daoStore.update((conf: DaoStore) => {
							if (!conf.daoData) conf.daoData = {} as InFlight;
							conf.daoData = undefined;
							return conf;
						});
						clearInterval(myint);
					}
				}, 20000);
			}
		}
	});
</script>

{#if $daoStore.daoData}
	<div class="mx-auto max-w-7xl py-6 md:px-6">
		<div class="my-8 flex w-full flex-col">
			<div class={' text-gray-1000 '}>
				<Banner message={getMessage($daoStore.daoData)} bannerType={'info'} />
			</div>
		</div>
	</div>
{/if}
