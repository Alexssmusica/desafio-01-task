import { Task } from '../entity/Task';

export default interface TaskRepository {
	findAll(): Promise<Task[]>;
	get(id: string): Promise<Task>;
	create(task: Task): Promise<void>;
	update(task: Partial<Task>): Promise<void>;
	delete(id: string): Promise<void>;
}
