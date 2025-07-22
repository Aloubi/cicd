import { Task } from '../models/task.model';

describe('Task Model', () => {
  it('should define title and completed fields correctly', () => {
    const task = Task.build({ title: 'Test task', completed: true });
    expect(task.title).toBe('Test task');
    expect(task.completed).toBe(true);
  });
});
