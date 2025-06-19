<script lang="ts">
	import tick from '$lib/assets/tick.png';
	import cross from '$lib/assets/cross.png';
	import { onMount } from 'svelte';
	import type { VoteEvent } from '@mijoco/stx_helpers/dist/dao';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { fmtMicroToStx, fmtNumberStacksFloor } from '$lib/utils';
	import { isVoting } from '$lib/components/proposals/proposals';

	export let bitcoinVotes: Array<VoteEvent> = [];
	export let stacksVotes: Array<VoteEvent> = [];
	export let proposal: VotingEventProposeProposal;

	let lockedPercent = '0';
	let unlockedPercent = '0';

	let bSumFor = bitcoinVotes.filter((o) => o.for).length;
	let bSumAg = bitcoinVotes.filter((o) => !o.for).length;
	let sSumFor = stacksVotes.filter((o) => o.for && o.amountLocked > 0).length;
	let sSumAg = stacksVotes.filter((o) => !o.for && o.amountLocked > 0).length;

	let bTotalFor: number;
	let bLockedFor: number;
	let bUnlockedFor: number;
	let bTotalAg: number;
	let bLockedAg: number;
	let bUnlockedAg: number;

	let sTotalFor: number;
	let sLockedFor: number;
	let sUnlockedFor: number;
	let sTotalAg: number;
	let sLockedAg: number;
	let sUnlockedAg: number;

	let totalLockedFor: number;
	let totalLockedAg: number;
	let totalUnlockedFor: number;
	let totalUnlockedAg: number;

	let totalWalletsFor: number;
	let totalWalletsAg: number;
	let totalWalletsBitcoinFor: number;
	let totalWalletsBitcoinAg: number;
	let totalWalletsStacksFor: number;
	let totalWalletsStacksAg: number;

	onMount(async () => {
		totalWalletsBitcoinFor = bitcoinVotes.filter((o) => o.for).length;
		totalWalletsBitcoinAg = bitcoinVotes.filter((o) => !o.for).length;
		totalWalletsStacksFor = stacksVotes.filter((o) => o.for).length;
		totalWalletsStacksAg = stacksVotes.filter((o) => !o.for).length;
		totalWalletsFor = totalWalletsBitcoinFor + totalWalletsStacksFor;
		totalWalletsAg = totalWalletsBitcoinAg + totalWalletsStacksAg;

		bTotalFor = bitcoinVotes.filter((o) => o.for).reduce((n, { amount }) => n + amount, 0);
		bLockedFor = bitcoinVotes.filter((o) => o.for).reduce((n, { amountLocked }) => n + amountLocked, 0);
		bUnlockedFor = bTotalFor - bLockedFor;
		bTotalAg = bitcoinVotes.filter((o) => !o.for).reduce((n, { amount }) => n + amount, 0);
		bLockedAg = bitcoinVotes.filter((o) => !o.for).reduce((n, { amountLocked }) => n + amountLocked, 0);
		bUnlockedAg = bTotalFor - bLockedFor;

		sTotalFor = stacksVotes.filter((o) => o.for).reduce((n, { amount }) => n + amount, 0);
		sLockedFor = stacksVotes.filter((o) => o.for).reduce((n, { amountLocked }) => n + amountLocked, 0);
		sUnlockedFor = stacksVotes.filter((o) => o.for).reduce((n, { amountUnlocked }) => n + amountUnlocked, 0);
		sTotalAg = stacksVotes.filter((o) => !o.for).reduce((n, { amount }) => n + amount, 0);
		sLockedAg = stacksVotes.filter((o) => !o.for).reduce((n, { amountLocked }) => n + amountLocked, 0);
		sUnlockedAg = stacksVotes.filter((o) => !o.for).reduce((n, { amountUnlocked }) => n + amountUnlocked, 0);

		bSumFor = bitcoinVotes.filter((o) => o.for).length;
		bSumAg = bitcoinVotes.filter((o) => !o.for).length;
		sSumFor = stacksVotes.filter((o) => o.for && o.amount > 0).length;
		sSumAg = stacksVotes.filter((o) => !o.for && o.amount > 0).length;

		totalLockedFor = bTotalFor + sLockedFor;
		totalLockedAg = bTotalAg + sLockedAg;
		const totalLockedPower = totalLockedFor + totalLockedAg;
		lockedPercent = ((totalLockedFor / totalLockedPower) * 100).toFixed(4);

		totalUnlockedFor = sUnlockedFor;
		totalUnlockedAg = sUnlockedAg;
		const totalUnlockedPower = totalUnlockedFor + totalUnlockedAg;
		unlockedPercent = ((totalUnlockedFor / totalUnlockedPower) * 100).toFixed(4);
	});
</script>

<div class="mb-8 space-y-4 align-top lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
	<div class="stretch self-start rounded-2xl bg-[#121314] p-8">
		<h3 class="text-3xl font-extralight text-white">Vote results</h3>
	</div>

	<div class="border-error-600 relative col-span-2 rounded-2xl bg-[#1c671b] p-8">
		<div class="mb-5 flex justify-between">
			<div></div>
			<div><span class="text-4xl font-extrabold"></span></div>
		</div>
		<div class="mb-5 flex justify-between">
			<div>
				<span class=""
					>{#if !isVoting(proposal)}Voting has closed{:else}Voting in progress{/if}</span
				>
			</div>
			<div>
				<p>
					{fmtNumberStacksFloor(totalLockedFor + totalUnlockedFor)} for {fmtNumberStacksFloor(totalLockedAg + totalUnlockedAg)} against
				</p>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="w-1/2"><span class="text-4xl font-extrabold">Locked Stacks</span></div>
			<div><span class="text-4xl font-extrabold">{typeof lockedPercent === 'number' ? lockedPercent : 0} %</span></div>
			<div>
				{#if Number(lockedPercent) >= 70}<img alt="correct" src={tick} />{:else}<img alt="correct" src={cross} />{/if}
			</div>
		</div>
		<div class="flex justify-between">
			<div class="w-1/2"><span class="text-4xl font-extrabold">Unlocked Stacks</span></div>
			<div><span class="text-4xl font-extrabold">{typeof unlockedPercent === 'number' ? unlockedPercent : 0} %</span></div>
			<div>
				{#if Number(unlockedPercent) >= 70}<img alt="correct" src={tick} />{:else}<img alt="correct" src={cross} />{/if}
			</div>
		</div>
		<!-- detailed breakdown -->
		<div class="mt-8 border-t pt-4">
			<div class="pb-5">
				<span class="text-sm font-extrabold">Breakdown by voting power</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full table-auto border-collapse border border-gray-200 text-sm">
					<thead>
						<tr class="bg-gray-100">
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">&nbsp;</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">Bitcoin</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">Stacks</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Locked for</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bLockedFor)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sLockedFor)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bLockedFor + sLockedFor)}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Locked against</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bLockedAg)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sLockedAg)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bLockedAg + sLockedAg)}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Unlocked for</td>
							<td class="border border-gray-200 px-4 py-2">-</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sUnlockedFor)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bUnlockedFor + sUnlockedFor)}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Unlocked against</td>
							<td class="border border-gray-200 px-4 py-2">-</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sUnlockedAg)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bUnlockedAg + sUnlockedAg)}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Total for</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bTotalFor)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sTotalFor)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bTotalFor + sTotalFor)}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Total against</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bTotalAg)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(sTotalAg)}</td>
							<td class="border border-gray-200 px-4 py-2">{fmtMicroToStx(bTotalAg + sTotalAg)}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="py-5">
				<span class="text-sm font-extrabold">Breakdown by wallet</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full table-auto border-collapse border border-gray-200 text-sm">
					<thead>
						<tr class="bg-gray-100">
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">&nbsp;</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">For</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">Against</th>
							<th class="border border-gray-200 px-4 py-2 text-left font-extrabold">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Bitcoin</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsBitcoinFor}</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsBitcoinAg}</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsBitcoinFor + totalWalletsBitcoinAg}</td>
						</tr>
						<tr>
							<td class="border border-gray-200 px-4 py-2 font-extrabold">Stacks</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsStacksFor}</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsStacksAg}</td>
							<td class="border border-gray-200 px-4 py-2">{totalWalletsStacksFor + totalWalletsStacksAg}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
