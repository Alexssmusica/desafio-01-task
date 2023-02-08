import { ImportCsvService } from './infra/service/streams/ImportCsvService';

async function run() {
	const importCsvService = new ImportCsvService();
	await importCsvService.init();
}

run();
