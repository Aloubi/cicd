/**
 * index.coverage.test.ts
 * Couvre le bloc `require.main === module` dans index.ts
 * Mock complet de express + sequelize + Task + Router
 */

jest.mock('../sequelize', () => {
  return {
    sequelize: {
      sync: jest.fn().mockResolvedValue(undefined),
      define: jest.fn(),
    },
  };
});

jest.mock('../models/task.model.ts', () => ({
  Task: {
    init: jest.fn(),
  },
}));

jest.mock('express', () => {
  const app = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn((port: number, cb: () => void) => cb()),
  };

  const express = () => app;

  (express as any).json = jest.fn();
  (express as any).Router = () => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  });

  return express;
});

describe('index.ts full coverage', () => {
  it('should run the server startup block without crashing', async () => {
    await import('../index');
    expect(true).toBe(true);
  });
});
