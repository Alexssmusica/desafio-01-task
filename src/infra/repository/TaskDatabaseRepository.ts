import { Task } from '../../domain/entity/Task';
import TaskRepository from '../../domain/repository/TaskRepository';
import { AppError } from '../../errors/AppError';
import { prisma } from '../database/PrismaInit';

export class TaskDatabaseRepository implements TaskRepository {
	async create(task: Task): Promise<void> {
		const { id, title, description, completedAt, createdAt, updatedAt } = task;
		await prisma.task.create({
			data: {
				id: id!,
				title,
				description,
				completedAt,
				createdAt: createdAt!,
				updatedAt: updatedAt!
			}
		});
	}

	async findAll(): Promise<Task[]> {
		const tasks: Task[] = [];
		const tasksData = await prisma.task.findMany();
		for (const taskData of tasksData) {
			const task = new Task({
				id: taskData.id,
				title: taskData.title,
				description: taskData.description,
				completedAt: taskData.completedAt,
				createdAt: taskData.createdAt,
				updatedAt: taskData.updatedAt
			});
			tasks.push(task);
		}
		return tasks;
	}

	async get(idTask: string): Promise<Task> {
		const task = await prisma.task.findUnique({ where: { id: idTask } });
		if (!task) throw new AppError(`Task ${idTask} not found`, 404);
		const { id, title, description, completedAt, createdAt, updatedAt } = task;
		return new Task({ id, title, description, completedAt, createdAt, updatedAt });
	}

	async update(task: Partial<Task>): Promise<void> {
		const { id, title, description, completedAt } = task;
		const taskDate = await prisma.task.findUnique({
			where: { id }
		});
		if (!taskDate) throw new AppError(`Task ${id} not found`, 404);
		const updatedAt = new Date();
		await prisma.task.update({
			where: { id },
			data: { title: title, description, completedAt, updatedAt }
		});
	}

	async delete(id: string): Promise<void> {
		const task = await prisma.task.findUnique({
			where: { id }
		});
		if (!task) throw new AppError(`Task ${id} not found`, 404);
		await prisma.task.delete({ where: { id } });
	}
}
