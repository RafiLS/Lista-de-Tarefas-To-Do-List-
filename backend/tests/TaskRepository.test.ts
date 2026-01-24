import { TaskRepository } from '../infrastructure/task/repository/TaskRepository';
import { TaskModel } from '../infrastructure/task/schema/TaskSchema';
import { TaskFactory } from '../domain/task/TaskFactory';
import { TaskId } from '../domain/task/TaskId';


jest.mock('../infrastructure/task/schema/TaskSchema', () => {
  return {
    TaskModel: {
      create: jest.fn(),
      findById: jest.fn(),
      find: jest.fn(),
      findByIdAndDelete: jest.fn(),
    },
  };
});

describe('TaskRepository', () => {
  let repo: TaskRepository;

  beforeEach(() => {
    repo = new TaskRepository();
    jest.clearAllMocks();
  });

  it('should add a task', async () => {
    const task = TaskFactory.createTask('Test Add');
    (TaskModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      title: task.title.value,
      completed: task.completed.value,
    });

    const result = await repo.add(task);

    expect(TaskModel.create).toHaveBeenCalledWith({
      title: 'Test Add',
      completed: false,
    });
    expect(result.title.value).toBe('Test Add');
    expect(result.completed.value).toBe(false);
    expect(result.id).toBeInstanceOf(TaskId);
  });

  it('should get all tasks', async () => {
    const fakeTasks = [
      { _id: '1', title: 'Task 1', completed: false },
      { _id: '2', title: 'Task 2', completed: true },
    ];
    (TaskModel.find as jest.Mock).mockResolvedValue(fakeTasks);

    const result = await repo.getAllAsync();

    expect(TaskModel.find).toHaveBeenCalled();
    expect(result.length).toBe(2);
    expect(result[0].title.value).toBe('Task 1');
    expect(result[1].completed.value).toBe(true);
  });

  it('should get a task by id', async () => {
    const fakeDoc = { _id: '1', title: 'Task 1', completed: false };
    (TaskModel.findById as jest.Mock).mockResolvedValue(fakeDoc);

    const result = await repo.getByIdAsync(new TaskId('1'));

    expect(TaskModel.findById).toHaveBeenCalledWith('1');
    expect(result.title.value).toBe('Task 1');
  });

  it('should delete a task', async () => {
    await repo.delete(new TaskId('1'));
    expect(TaskModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
