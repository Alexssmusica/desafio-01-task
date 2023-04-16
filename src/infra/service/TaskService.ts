import { Task, TasksProps } from '../../domain/entity/Task.js';
import TaskRepository from '../../domain/repository/TaskRepository.js';

export class TaskService {
	constructor(readonly taskRepository: TaskRepository) {}

	async getTasks(): Promise<TasksProps[]> {
		const tasks = await this.taskRepository.findAll();
		const output = tasks.map((task) => {
			return {
				id: task.id,
				title: task.title,
				description: task.description,
				completedAt: task.completedAt,
				createdAt: task.createdAt,
				updatedAt: task.updatedAt
			};
		}) as TasksProps[];
		return output;
	}

	async getTask(idTask: string): Promise<TasksProps> {
		const task = await this.taskRepository.get(idTask);
		return {
			id: task.id,
			title: task.title,
			description: task.description,
			completedAt: task.completedAt,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt
		};
	}

	async createTask(title: string, description: string): Promise<void> {
		return this.taskRepository.create(new Task({ title, description }));
	}

	async updateTask(id: string, title: string, description: string): Promise<void> {
		await this.taskRepository.update(new Task({ id, title, description }));
	}

	async deleteTask(idTask: string): Promise<void> {
		await this.taskRepository.delete(idTask);
	}

	async completedTask(id: string): Promise<void> {
		const taskData = await this.taskRepository.get(id);
		let completedAt: Date | null;
		if (!taskData.completedAt) {
			completedAt = new Date();
		} else {
			completedAt = null;
		}
		await this.taskRepository.update({ id, completedAt });
	}
}
