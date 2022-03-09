import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-spotify'
import { config } from 'dotenv'

import { Injectable } from '@nestjs/common'

config()

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
	constructor() {
		super({
			clientID: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/spotify/redirect'
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		// Aqui validas info que te llega del OAUTH
		const user = {
			accessToken
			// name: profile.displayName,
			// avatarURL: profile.photos[0].value,
			// id: profile.id,
			// profileURL: profile.profileUrl
		}
		done(null, user)
	}
}
