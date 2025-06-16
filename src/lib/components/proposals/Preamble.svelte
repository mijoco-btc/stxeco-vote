<script lang="ts">
	import { explorerAddressUrl } from '$lib/stacks/stacks-connect';
	import type { ProposalMeta } from '@mijoco/stx_helpers/dist/index';
	import { daoVotingSupported } from './proposals';

	export let votingContract: string | undefined;
	export let submissionContract: string | undefined;
	export let contractId: string;
	export let proposalMeta: ProposalMeta;
</script>

<div class="relative mt-4 overflow-hidden rounded-2xl bg-[#0A0A0B] px-8 py-8 text-white sm:px-10 sm:py-10 md:grid md:auto-cols-auto md:grid-flow-col md:gap-12 md:px-12">
	<div>
		<dl class="divide-y divide-white/10">
			{#if daoVotingSupported}
				<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-md leading-6 text-white">DAO</dt>
					<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0">{proposalMeta.dao || 'Ecosystem DAO'}</dd>
				</div>
			{/if}
			<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-md leading-6 text-white">Proposal</dt>
				<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0"><a href={explorerAddressUrl(contractId)} target="_blank">{proposalMeta.title}</a></dd>
			</div>
			<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-md leading-6 text-white">Author(s)</dt>
				<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0">{@html proposalMeta.author}</dd>
			</div>
			<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-md leading-6 text-white">Synopsis</dt>
				<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0">{@html proposalMeta.synopsis}</dd>
			</div>
			<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-md leading-6 text-white">Description</dt>
				<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0">{@html proposalMeta.description}</dd>
			</div>
			{#if daoVotingSupported}
				{#if votingContract}
					<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-md leading-6 text-white">Voting contract</dt>
						<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0"><a href={explorerAddressUrl(votingContract)} target="_blank">{votingContract.split('.')[1]}</a></dd>
					</div>
				{/if}
				{#if submissionContract}
					<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-md leading-6 text-white">Funding contract</dt>
						<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0"><a href={explorerAddressUrl(submissionContract)} target="_blank">{submissionContract.split('.')[1]}</a></dd>
					</div>
				{/if}
				<div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-md leading-6 text-white">Proposal contract</dt>
					<dd class="text-md mt-1 leading-6 text-sand-300 sm:col-span-2 sm:mt-0"><a href={explorerAddressUrl(contractId)} target="_blank">{contractId.split('.')[1]}</a></dd>
				</div>
			{/if}
		</dl>
	</div>
</div>
