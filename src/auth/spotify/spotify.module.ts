import { Module } from '@nestjs/common'
import { SpotifyController } from './spotify.controller'
import { SpotifyService } from './spotify.service'
import { SpotifyStrategy } from './spotify.strategy'

@Module({
	controllers: [SpotifyController],
	providers: [SpotifyService, SpotifyStrategy]
})
export class SpotifyModule {}
