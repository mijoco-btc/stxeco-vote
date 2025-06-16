<script lang="ts">
	import { fmtNumber } from '$lib/utils';

	export let event: any;

	const clazzes = ' py-2 w-full grid grid-cols-3 lg:grid-cols-4 justify-between my-0 text-md';
</script>

<div class={' grid-cols-4 justify-end text-gray-800' + clazzes}>
	<div class="col-span-2 grow"><span><a class="text-blue-500 hover:underline" href={'/dao/proposals/propose?tentativeCId=' + event.tag}>{event.proposalMeta.title}</a></span></div>
	<div class="inline-flex flex-shrink whitespace-nowrap">{fmtNumber(event.expectedStart)}</div>
	<div class="inline-flex flex-shrink whitespace-nowrap">{fmtNumber(event.expectedEnd)}</div>
</div>
