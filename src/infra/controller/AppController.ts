import HttpServer from '../http/HttpServer.js';

export default class AppController {
	constructor(readonly httpServer: HttpServer) {
		httpServer.route('get', '/', async function () {
			return {
				message: 'Servidor iniciado.'
			};
		});
	}
}
