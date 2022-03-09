import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common'
import { SpotifyService } from './spotify.service'
import { AuthGuard } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'

@Controller('/auth/spotify')
export class SpotifyController {
	constructor(private readonly spotifyService: SpotifyService) {}

	@Get('/login')
	@UseGuards(AuthGuard('spotify'))
	async spotifyAuth(@Req() req) {}

	@Get('/redirect')
	@UseGuards(AuthGuard('spotify'))
	spotifyAuthRedirect(@Req() req: FastifyRequest) {
		return this.spotifyService.spotifyLogin(req)
	}
}
