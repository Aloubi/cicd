import { sayHello } from '../controllers/task.controller';

describe('Task Controller', () => {
  it('should return hello message', () => {
    expect(sayHello()).toBe('Hello from controller');
  });
});
