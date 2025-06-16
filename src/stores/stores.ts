import type { AddressObject, DaoOverview, ExchangeRate, StacksBalance, StacksInfo, TokenBalances, TokenPermissionEvent, UserReputationContractData } from '@mijoco/stx_helpers/dist/index';
import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const sessionStore = persisted('sessionStore', {} as BigMarketSessionStore);

export type Currency = {
	code: string;
	name: string;
	flag: string;
	symbol: string;
};

export type UserSettings = {
	executiveTeamMember: boolean;
};

export type BigMarketSessionStore = {
	name: string;
	loggedIn: boolean;
	balances?: StacksBalance;
	keySets: { [key: string]: AddressObject };
	userSettings: UserSettings;
	exchangeRates: Array<ExchangeRate>;
	stacksInfo: StacksInfo;
	tokens: Array<TokenPermissionEvent>;
	daoOverview: DaoOverview;
	userReputationData?: UserReputationContractData;
	tokenBalances: TokenBalances;
};

// stores.ts

// Track user input amount
export const chain = writable('testnet');
export const isLocalhost = writable(false);
export const selectedCurrency = persisted('selectedCurrency', { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' } as Currency);
