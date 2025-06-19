<script>
	import NakamotoBackground from '../ui/NakamotoBackground.svelte';
	import NakamotoShield from '../ui/NakamotoShield.svelte';
</script>

<div>
	<div class="my-8 flex w-full flex-col rounded-2xl bg-[#F4F3F0]">
		<div class="relative overflow-hidden px-10 py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12 md:px-12">
			<div class="text-gray-900">
				<div class="mb-4">
					<h2 class="mb-3 text-2xl text-[#131416]">Count in progress</h2>
				</div>
				<div class="relative max-w-xl space-y-3 rounded-lg bg-[#E6E4E2] px-6 py-6">
					<p>Results will be displayed here soon.</p>
				</div>
			</div>

			<NakamotoBackground />
			<NakamotoShield />
		</div>
	</div>
</div>
