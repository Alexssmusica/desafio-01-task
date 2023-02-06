import { Task } from '../src/domain/entity/Task';

test('Deve criar uma task', function () {
	const task = new Task({
		title: 'Task 1',
		description: 'Description task 1',
		createdAt: new Date(),
		updatedAt: new Date()
	});
	expect(task.title).toBe('Task 1');
	expect(task.description).toBe('Description task 1');
});

test('Não deve criar uma task sem titulo', function () {
	expect(
		() =>
			new Task({
				title: '',
				description: 'Description task 1'
			})
	).toThrow(new Error('Title is required'));
});

test('Não deve criar uma task sem description', function () {
	expect(
		() =>
			new Task({
				title: 'Task 1',
				description: ''
			})
	).toThrow(new Error('Description is required'));
});
