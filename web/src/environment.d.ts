export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ALGOLIA_ADMIN_KEY: string;
		}
	}
}
