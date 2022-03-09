import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'

import { FastifyInstance } from 'fastify'
import secureSession from 'fastify-secure-session'

import { AppModule } from './app.module'

import { config } from 'dotenv'

config()

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
	const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance()

	fastifyInstance
		.decorateReply('setHeader', function (name: string, value: unknown) {
			this.header(name, value)
		})
		.decorateReply('end', function () {
			this.send('')
		})

	app.register(secureSession, {
		secret: process.env.COOKIE_SECRET,
		salt: process.env.COOKIE_SALT,
		cookie: {
			path: '/'
		}
	})

	await app.listen(3000, '0.0.0.0')

	console.log(`API on http://localhost:3000/`)
}

bootstrap()
