export interface TransferSong {
	provider: string
	id: string
	name: string
	authors: string[]
	urlToSong: string
}

export interface QueryTransferSong {
	provider: string
	authors: string[]
	name: string
	hardSearch: boolean
}
