import SpotifyWebApi from 'spotify-web-api-node'
import { config } from 'dotenv'
import { findBestMatch } from 'string-similarity'
import { QueryTransferSong, TransferSong } from '../songs.interface'

config()

const SpotifyAPI = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const equals = (arr1, arr2) => {
	return (
		arr1.length === arr2.length &&
		arr1.some((value, index) => value === arr2[index])
	)
}

export async function Spotify(
	getSongData: QueryTransferSong,
	accessToken: string
): Promise<TransferSong> {
	SpotifyAPI.setAccessToken(accessToken)
	const SearchRequest = await SpotifyAPI.searchTracks(getSongData.name)
	if (!SearchRequest) throw new Error(`[SPOTIFY_SEARCH] Fail to search song`)
	if (SearchRequest.statusCode !== 200)
		throw new Error(
			`[STATUS_ERROR] Petition return with error code ${SearchRequest.statusCode}`
		)
	if (!SearchRequest.body)
		throw new Error(`[SONGS_DATA] No data was returned`)

	const SongsData = SearchRequest.body.tracks.items
	if (!SongsData) throw new Error(`[SONGS_DATA] No data was returned`)
	if (!SongsData || !SongsData.length)
		throw new Error(`[SONGS_DATA] No items were returned`)

	let RawSong: SpotifyApi.TrackObjectFull
	if (getSongData.hardSearch) {
		SongsData.forEach((x) => {
			if (
				!equals(
					getSongData.authors.map((x) => x.toLowerCase()),
					x.artists.map((x) => x.name.toLowerCase())
				)
			) {
				return (RawSong = x)
			}
		})
	} else {
		const BestMatch = findBestMatch(
			getSongData.authors.join(', '),
			SongsData.map((x) => x.artists.join(', '))
		)
		RawSong = SongsData[BestMatch.bestMatchIndex]
	}

	const Song: TransferSong = {
		provider: 'spotify',
		id: RawSong.id,
		name: RawSong.name,
		authors: RawSong.artists.map((x) => x.name),
		urlToSong: `https://open.spotify.com/track/${RawSong.id}`
	}
	SpotifyAPI.resetAccessToken()
	return Song
}
