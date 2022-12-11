export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ALGOLIA_ADMIN_KEY: string;
			GATSBY_ALGOLIA_SEARCH_KEY: string;
			CRONHOOKS_SECRET: string;
		}
	}
}
