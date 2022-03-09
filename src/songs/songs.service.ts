import { Injectable } from '@nestjs/common'
import { GetSongArgs } from './dto/get-song.args'

import { QueryTransferSong, TransferSong } from './songs.interface'
import { Spotify } from './providers/spotify'
import { Youtube } from './providers/youtube'
import { Session } from 'fastify-secure-session'

@Injectable()
export class SongsService {
	public async getSong(
		getSongData: GetSongArgs,
		session: Session
	): Promise<TransferSong> {
		try {
			const TransferSongData: QueryTransferSong = getSongData as any
			TransferSongData.authors = getSongData.authors.split(',')
			TransferSongData.hardSearch =
				getSongData.hardSearch === 'true' ? true : false

			switch (TransferSongData.provider) {
				case 'youtube': {
					return await Youtube(TransferSongData)
				}

				case 'spotify': {
					return await Spotify(
						TransferSongData,
						session.get('spotifyToken')
					)
				}
			}
		} catch (e) {
			console.error(e)
		}
	}
}
