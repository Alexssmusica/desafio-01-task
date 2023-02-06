import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
	log: [
		'query',
		{
			emit: 'event',
			level: 'query'
		}
	],
	errorFormat: 'colorless'
});

prisma.$on('query', (event) => {
	if (event.params) console.log('\x1b[36m%s\x1b[0m', 'Params: ' + event.params);
	console.log('\x1b[33m%s\x1b[0m', 'Duration: ' + event.duration + 'ms');
});
