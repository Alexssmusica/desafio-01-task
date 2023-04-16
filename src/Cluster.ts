import cluster from 'node:cluster';
import os from 'node:os';

const runPrimaryProcess = () => {
	const processCount = os.cpus().length;
	console.log(`Primary ${process.pid} is running`);
	console.log(`Forking Server with ${processCount} processes \n`);

	for (let index = 0; index < processCount; index++) {
		cluster.fork();

		cluster.on('exit', (worker, code, signal) => {
			if (code !== 0 && !worker.exitedAfterDisconnect) {
				console.log(`Worker exited with code ${worker.process.pid}`);
				cluster.fork();
			}
		});
	}
};

const runWorkerProcess = async () => {
	await import('./main.js');
};
cluster.isMaster ? runPrimaryProcess() : runWorkerProcess();
