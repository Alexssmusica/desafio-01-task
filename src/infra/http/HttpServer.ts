export default interface HttpServer {
	route(method: string, url: string, callback: Function, status?: number): void;
	listen(port: number): void;
}
