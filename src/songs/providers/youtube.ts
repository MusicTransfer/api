import axios from 'axios'
import { config } from 'dotenv'
import { findBestMatch } from 'string-similarity'
import { QueryTransferSong, TransferSong } from '../songs.interface'

config()

const YoutubeAPI = 'https://www.googleapis.com/youtube/v3/'
const YoutubeSearchDefault = `${YoutubeAPI}search?part=snippet&key=${process.env.YT_API_KEY}&type=video&regionCode=US`

export async function Youtube(
	getSongData: QueryTransferSong
): Promise<TransferSong> {
	const name = getSongData.hardSearch
		? getSongData.name + ' Audio'
		: getSongData.name
	const url = `${YoutubeSearchDefault}&q=${encodeURIComponent(name)}`

	const SearchRequest = await axios.get(url)
	if (!SearchRequest) throw new Error('[YOUTUBE_SEARCH] Fail to search video')
	if (SearchRequest.status !== 200)
		throw new Error(
			`[STATUS_ERROR] Petition return with error code ${SearchRequest.status}, ${SearchRequest.statusText}`
		)
	if (!SearchRequest.data)
		throw new Error(`[SONGS_DATA] No data was returned`)

	const SongsData = SearchRequest.data.items
	if (!SongsData || !SongsData.length)
		throw new Error(`[SONGS_DATA] No items were returned`)

	const BestAuthorMatch = findBestMatch(
		getSongData.authors.join(', '),
		SongsData.map((x) => x.snippet.channelTitle)
	)
	const RawSongData = getSongData.hardSearch
		? SongsData[0]
		: SongsData[BestAuthorMatch.bestMatchIndex]
	const RawSong = getSongData.hardSearch
		? SongsData[0].snippet
		: RawSongData.snippet
	const Song: TransferSong = {
		provider: 'youtube',
		id: RawSongData.id.videoId,
		name: RawSong.title,
		authors: [RawSong.channelTitle],
		urlToSong: `https://youtu.be/${RawSongData.id.videoId}`
	}

	return Song
}
