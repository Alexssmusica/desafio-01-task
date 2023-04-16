import { randomUUID } from 'crypto';
import { AppError } from '../../errors/AppError.js';

export interface TasksProps {
	id?: string;
	title: string;
	description: string;
	completedAt?: Date | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Task {
	private props: TasksProps;
	constructor(props: TasksProps) {
		this.props = props;
		if (this.props.title === '') throw new AppError('Title is required');
		if (this.props.description === '') throw new AppError('Description is required');
		if (!this.props.id) this.props.id = randomUUID();
		if (!this.props.createdAt) this.props.createdAt = new Date();
		if (!this.props.updatedAt) this.props.updatedAt = new Date();
	}

	get id() {
		return this.props.id;
	}

	get title() {
		return this.props.title;
	}

	get description() {
		return this.props.description;
	}

	get completedAt() {
		return this.props.completedAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}
}
