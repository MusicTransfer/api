declare global {
	namespace NodeJS {
		interface ProcessEnv {
			YT_API_KEY: string
			SPOTIFY_CLIENT_ID: string
			SPOTIFY_CLIENT_SECRET: string
			COOKIE_SECRET: string
			COOKIE_SALT: string
		}
	}
}

export {}
