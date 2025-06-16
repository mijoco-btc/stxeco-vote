import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	plugins: [sveltekit()],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: [] // Disable prerendering globally
		},
		alias: {
			// this will match a file
			$lib: './src/lib',
			'$lib/*': './src/lib/*',
			$types: './src/types',
			'$types/*': './src/types/*',
			$stores: './src/stores',
			'$stores/*': './src/stores/*'
		}
	}
};

export default config;
