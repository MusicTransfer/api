import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!'
	}

	getEndpoints(): string {
		return `
		- /api/song
		- /auth/spotify`
	}
}
