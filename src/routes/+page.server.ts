import type { PageServerLoad } from './$types';
import { getCached, setCached } from '$lib/server/cache';
import { config, getNetworkFromUrl } from '$lib/config';
import type { VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
import { getActiveProposals } from '$lib/components/proposals/proposals';
import { getTentativeProposals } from '$lib/components/proposals/proposals';
import { getConcludedProposals } from '$lib/components/proposals/proposals';

export const load: PageServerLoad = async ({ url }) => {
	const network = getNetworkFromUrl(url);
	const appConfig = config[network];

	const key = 'home-page';
	const cached = getCached(key);
	if (cached) {
		//console.log('CACHE HIT: fetching markets: ', cached);
		return cached;
	}

	const proposals: Array<VotingEventProposeProposal> = await getActiveProposals();
	const tentativeProposals = await getTentativeProposals();
	const inactiveProposals = await getConcludedProposals();

	//console.log('CACHE MISS: fetching markets: ', markets);
	//console.log('CACHE MISS: fetching leaderboard: ', leaderBoard);

	const result = { proposals, tentativeProposals, inactiveProposals };
	setCached(key, result, 1000 * 60 * 10); // 10 mins
	return result;
};
