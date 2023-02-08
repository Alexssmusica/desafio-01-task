import { parse, Parser } from 'csv-parse';
import fs from 'node:fs';
import { Task } from '../../../domain/entity/Task';

export class ImportCsvService {
	private csvPath: URL;
	private stream: fs.ReadStream;
	private csvParse: Parser;

	constructor() {
		this.csvPath = new URL('./tasks.csv', import.meta.url);
		this.stream = fs.createReadStream(this.csvPath);
		this.csvParse = parse({
			delimiter: ',',
			skipEmptyLines: true,
			fromLine: 2 // skip the header line
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
