<script lang="ts">
	import BullsEye from "$lib/assets/home/BullsEye.svelte";

	export let propType:string;

</script>

<div class="py-10 px-10 bg-[#F4F3F0] rounded-2xl md:grid md:gap-12 md:grid-flow-col md:auto-cols-auto overflow-hidden relative">
	<!-- <NakamotoRelease/> --> 
	<div class="mt-4 sm:mt-0 relative z-[1]">
		<div class="mb-4">
			<h2 class="text-[#131416] text-xl mb-3">No {propType} proposals</h2>
		</div>
	</div>
	<BullsEye />
</div>
