<script lang="ts">
	import { onMount, tick } from 'svelte';
	import QrCode from 'svelte-qrcode';
	import { Icon, ClipboardDocument } from 'svelte-hero-icons';
	import { fmtSatoshiToBitcoin } from '$lib/utils';
	import { makeFlash } from '@mijoco/stx_helpers/dist/index';
	import LinkToExplorer from '$lib/components/ui/LinkToExplorer.svelte';
	import { explorerBtcAddressUrl } from '$lib/stacks/stacks-connect';

	export let address: string;
	export let voteFor = false;
	// NB Its possible the user paid a different amount to the amount they entered in the UI - ths takes the on chain amount first
	let amount = 6000;
	let copied = false;
	let valueCopy: string | undefined;
	let areaDom: any;
	let showCopy = false;

	/**
  const copy = async () => {
    let ele= 'address-field-yes'
    if (!voteFor) ele += '-no'
    let nameProp = paymentUri();
    let clippy = {
      target: document.getElementById('clipboard')!,
      props: { name: nameProp },
    }
    const app = new CopyClipboard(clippy);
    app.$destroy();
    makeFlash(document.getElementById(ele))
    copied = true;
  }*/
	const copy = async () => {
		showCopy = true;
		let value = paymentUri();
		valueCopy = value;
		await tick();
		areaDom.focus();
		areaDom.select();
		let message = 'Copying text was successful';
		try {
			const successful = document.execCommand('copy');
			if (!successful) {
				message = 'Copying text was unsuccessful';
			}
		} catch (err) {
			message = 'Oops, unable to copy';
		}

		// we can notifi by event or storage about copy status
		console.log(message);
		valueCopy = undefined;
		let ele = 'address-field-yes';
		if (!voteFor) ele = 'address-field-no';
		makeFlash(document.getElementById(ele));
		setTimeout(function () {
			showCopy = false;
		}, 4000);
	};

	$: getAddress = (full: boolean): string => {
		return address;
	};

	const paymentUri = () => {
		let uri = 'bitcoin:' + address;
		uri += '?amount=' + fmtSatoshiToBitcoin(amount);
		uri += '&label=' + encodeURI('Stacks Nakamoto vote');
		return uri;
	};

	onMount(async () => {});
</script>

<div id="clipboard"></div>
{#if valueCopy != null}
	<textarea bind:this={areaDom}>{valueCopy}</textarea>
{/if}

<div class="relative z-[1]">
	<div class="flex items-start justify-between">
		<div>
			{#if voteFor}
				<div class="flex flex-col gap-5">
					<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M18.1048 40.4977L4.47473 26.3594C3.84176 25.7049 3.84176 24.5703 4.47473 23.9158L9.07436 19.1594C9.70734 18.5049 10.8045 18.5049 11.4375 19.1594L19.0332 27.0576L36.3346 7.5521C36.9675 6.85391 38.0225 6.81028 38.6977 7.46483L43.4661 12.003C44.1413 12.6576 44.1835 13.7485 43.5505 14.4467L20.5523 40.454C19.8772 41.1522 18.78 41.1959 18.1048 40.4977Z"
							fill="black"
						/>
					</svg>
					<p class="text-3xl">Yes</p>
				</div>
			{:else}
				<div class="flex flex-col gap-5">
					<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M43.3228 9.37246L38.6275 4.6772C37.7246 3.77427 36.4605 3.77427 35.5576 4.6772L24 16.2348L12.4424 4.6772C11.5395 3.77427 10.0948 3.77427 9.37246 4.6772L4.6772 9.37246C3.77427 10.0948 3.77427 11.5395 4.6772 12.4424L16.2348 24L4.6772 35.5576C3.77427 36.4605 3.77427 37.7246 4.6772 38.6275L9.37246 43.3228C10.0948 44.2257 11.5395 44.2257 12.4424 43.3228L24 31.7652L35.5576 43.3228C36.4605 44.2257 37.7246 44.2257 38.6275 43.3228L43.3228 38.6275C44.2257 37.7246 44.2257 36.4605 43.3228 35.5576L31.7652 24L43.3228 12.4424C44.2257 11.5395 44.2257 10.0948 43.3228 9.37246Z"
							fill="black"
						/>
					</svg>
					<p class="text-3xl">No</p>
				</div>
			{/if}
		</div>
		<div class="overflow-hidden rounded-lg border border-sand-300">
			<QrCode value={paymentUri()} size={200} color={'#000'} background={'#fff'} />
		</div>
	</div>

	<div class="mt-8">
		<div class="flex items-end justify-between">
			<p>Send {fmtSatoshiToBitcoin(amount)} BTC to:</p>
			<div class="flex items-center gap-2">
				<LinkToExplorer class="flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-black text-white transition duration-200 hover:border-gray-900" target={explorerBtcAddressUrl(getAddress(true))} />
				<button id="copy-address" type="button" on:click={() => copy()} class="flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-black text-white transition duration-200 hover:border-gray-900">
					<Icon src={ClipboardDocument} class="h-5 w-5 text-white" aria-hidden="true" />
				</button>
			</div>
		</div>
		<div id={voteFor ? 'address-field-yes' : 'address-field-no'} class="mt-2 break-words rounded-md bg-[#121314] px-2 py-2 font-mono text-sm text-white">{getAddress(false)}</div>
		<div class={showCopy ? 'visible text-sm' : 'invisible text-sm'}>Copied to clipboard</div>
	</div>
</div>
