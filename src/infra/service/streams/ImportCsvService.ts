import { parse, Parser } from 'csv-parse';
import fs from 'node:fs';
import path from 'node:path';
import { Task } from '../../../domain/entity/Task';

export class ImportCsvService {
	private stream: fs.ReadStream;
	private csvParse: Parser;

	constructor() {
		const arquivo = path.resolve('tasks.csv');
		this.stream = fs.createReadStream(arquivo);
		this.csvParse = parse({
			delimiter: ',',
			skipEmptyLines: true,
			fromLine: 2
		});
	}

	async init() {
		const linesPrase = this.stream.pipe(this.csvParse);
		for await (const line of linesPrase) {
			const [title, description] = line as Task[];
			await fetch('http://localhost:3333/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					description
				})
			});
		}
	}
}
