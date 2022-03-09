import { Controller, Get, Res } from '@nestjs/common'

@Controller('auth')
export class AuthController {
	constructor() {}

	@Get('/spotify')
	async SpotifyAuth(@Res() res) {
		res.status(301).redirect('/auth/spotify/login')
	}
}
