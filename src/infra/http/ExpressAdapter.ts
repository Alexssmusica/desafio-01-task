import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import HttpServer from './HttpServer';
import { Methods } from './types/Types';

export default class ExpressAdapter implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	route(method: Methods, url: string, callback: Function, status = 200): void {
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body);
				res.status(status).json(output);
			} catch (error: any) {
				if (error instanceof AppError) {
					res.status(error.statusCode).json(error).end();
				} else {
					res.status(500).json(error).end();
				}
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => console.log(`Servidor rest iniciado na porta ${port}.`));
	}
}
