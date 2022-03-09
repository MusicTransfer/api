import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { SpotifyModule } from './spotify/spotify.module'

@Module({
	controllers: [AuthController],
	imports: [SpotifyModule]
})
export class AuthModule {}
