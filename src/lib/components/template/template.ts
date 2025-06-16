import { getConfig, getSession } from '$stores/store_helpers';
import type { HeaderLink } from '@mijoco/stx_helpers/dist/index';

export function getRouterInfo(headerLinks: Array<HeaderLink>, routeId: string) {
	const link = getConfig().VITE_HEADER_LINKS.find((o: { name: string }) => routeId === o.name);
	if (link) {
		//link.href += '?chain=devnet'
		headerLinks.push(link);
	}
	return link;
}
