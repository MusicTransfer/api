import { Controller, Get, Query, Req, Res, Session } from '@nestjs/common'
import { Session as SessionI } from 'fastify-secure-session'
import { GetSongArgs } from './dto'

import { SongsService } from './songs.service'

const Providers = ['youtube', 'spotify']

@Controller()
export class SongsController {
	constructor(private readonly songsServices: SongsService) {}

	@Get('/api/song')
	async getSong(
		@Res() res,
		@Query() q: GetSongArgs,
		@Session() session: SessionI
	) {
		if (!Providers.includes(q.provider)) {
			return res
				.status(404)
				.send(
					'[PROVIDER_UNKNOWN] That provider is not currently handled'
				)
		}

		console.log(session.get('spotifyToken'))

		if (q.provider === 'spotify' && !session.get('spotifyToken'))
			return res.status(301).redirect('/auth/spotify')
		const Data = await this.songsServices.getSong(q, session)

		return res.status(200).send(Data)
	}
}
