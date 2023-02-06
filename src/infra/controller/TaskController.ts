import { Task } from '../../domain/entity/Task';
import TaskRepository from '../../domain/repository/TaskRepository';
import HttpServer from '../http/HttpServer';
import { TaskService } from '../service/TaskService';

export class TaskController {
	constructor(readonly http: HttpServer, readonly taskRepository: TaskRepository) {
		http.route('get', '/tasks', async function (_params: any, _body: any) {
			const taskService = new TaskService(taskRepository);
			const tasks = await taskService.getTasks();
			return tasks;
		});

		http.route('get', '/tasks/:id', async function (params: any, _body: any) {
			const taskService = new TaskService(taskRepository);
			const task = await taskService.getBoard(params.id);
			return task;
		});

		http.route(
			'post',
			'/tasks/',
			async function (_params: any, body: any) {
				const taskService = new TaskService(taskRepository);
				const { title, description } = body as Task;
				await taskService.createTask(title, description);
			},
			201
		);

		http.route(
			'delete',
			'/tasks/:id',
			async function (params: any, _body: any) {
				const taskService = new TaskService(taskRepository);
				await taskService.deleteTask(params.id);
			},
			204
		);

		http.route(
			'patch',
			'/tasks/:id/complete',
			async function (params: any, _body: any) {
				const taskService = new TaskService(taskRepository);
				await taskService.completedTask(params.id);
			},
			204
		);

		http.route(
			'put',
			'/tasks/:id',
			async function (params: any, body: any) {
				const taskService = new TaskService(taskRepository);
				const { title, description } = body as Task;
				await taskService.updateTask(params.id, title, description);
			},
			204
		);

		http.route(
			'delete',
			'/tasks/:id',
			async function (params: any, _body: any) {
				const taskService = new TaskService(taskRepository);
				await taskService.deleteTask(params.id);
			},
			204
		);
	}
}
