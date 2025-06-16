// global.d.ts
declare module 'svelte-apexcharts' {
	import { SvelteComponentTyped } from 'svelte';

	interface ApexChartProps {
		options?: any;
		series?: any;
		type?: string;
		width?: string | number;
		height?: string | number;
	}

	export default class ApexCharts extends SvelteComponentTyped<ApexChartProps> {}
}

// interface WalletProvider {
// 	get: (walletName: string) => Wallet | undefined;
// }

// interface Wallet {
// 	features: {
// 		'standard:connect'?: {
// 			connect: () => Promise<{ accounts: Array<{ address: string }> }>;
// 		};
// 		'standard:disconnect'?: {
// 			disconnect: () => Promise<void>;
// 		};
// 	};
// }

// declare global {
// 	interface Window {
// 		wallets: WalletProvider;
// 	}
// }

//export {};
