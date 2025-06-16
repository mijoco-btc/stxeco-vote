// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return new Response('{}', {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		const response = await resolve(event);

		// Add custom headers
		response.headers.set('x-powered-by', 'bigmarket-node-ssr');

		return response;
	}
};
