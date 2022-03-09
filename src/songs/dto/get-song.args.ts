import { IsNotEmpty, IsOptional } from 'class-validator'

export class GetSongArgs {
	@IsNotEmpty()
	provider: string

	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	authors: string

	@IsOptional()
	hardSearch: string
}
