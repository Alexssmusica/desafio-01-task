import { ImportCsvService } from './infra/service/streams/ImportCsvService.js';

async function run() {
	const importCsvService = new ImportCsvService();
	await importCsvService.init();
}

run();
