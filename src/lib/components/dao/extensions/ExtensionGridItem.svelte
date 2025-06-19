<script lang="ts">
import { createEventDispatcher } from 'svelte';
	import type { DaoEventEnableExtension, ExtensionType } from '@mijoco/stx_helpers/dist/index';
	import { getConfig } from '$stores/store_helpers';

let dispatch = createEventDispatcher();

export let extension:DaoEventEnableExtension;
export let status = { name: 'active', color: 'info', colorCode: '#4786cd' };
if (!extension.enabled) {
	status = { name: 'inactive', color: 'primary', colorCode: '#4B515D' };
}
const openSesame = () => {
	dispatch('openSourceModal', extension)
}
const openExtensionChecker = () => {
	dispatch('openExtensionChecker', extension)
}
const explorerUrl = () => {
	return `${getConfig().VITE_STACKS_EXPLORER}/txid/${extension.extension}?chain=${getConfig().VITE_NETWORK}&api=${getConfig().VITE_STACKS_API}`;
}
const statusStyle = () => {
    let clazzes = 'border-top: 1pt solid ' + status.colorCode + '; border-left: 1pt solid ' + status.colorCode + '; border-right: 1pt solid ' + status.colorCode + ';';
    return clazzes;
}

const actionStyle = () => {
    let clazzes = 'border-top: 1pt solid ' + status.colorCode + '; border-left: 1pt solid ' + status.colorCode + '; border-bottom: 1pt solid ' + status.colorCode + ';';
    return clazzes;
}

const actionRightStyle = () => {
    let clazzes = 'border: 1pt solid ' + status.colorCode + ';';
    return clazzes;
}
const headerStyle = () => {
    let clazzes = 'upper text-' + status.color;
    return clazzes;
}

</script>

<div class="col-span-4">
		<a href="/" >{extension.extension}</a>
	</div>
<div class="col-span-1">
		{extension.enabled}
	</div>
<div class="col-span-1">
	<!--<a class="pointer text-light" href="/" on:click|preventDefault={() => { openSesame() }}>Clarity</a>-->
	<a class="pointer text-light" href={explorerUrl()} target="_blank">Explorer</a>
	{#if extension.extension.indexOf('vot') > -1 || extension.extension.indexOf('bde001') > -1 || extension.extension.indexOf('ede005') > -1 || extension.extension.indexOf('bde007') > -1}
	<a class="pointer text-light border-s ms-3 ps-3" href="/" on:click|preventDefault={() => openExtensionChecker()}>Count</a>
	{/if}
</div>

