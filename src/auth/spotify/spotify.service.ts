import { Injectable } from '@nestjs/common'

@Injectable()
export class SpotifyService {
	spotifyLogin(req) {
		if (!req.user) {
			return 'No user from spotify'
		}

		req.session.set('spotifyToken', req.user.accessToken)

		return {
			message: 'You logged succesfully into spotify'
		}
	}
}
