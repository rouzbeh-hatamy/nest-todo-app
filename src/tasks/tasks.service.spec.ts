import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  // ma mikhaym ghabl az har test ye instance az service va repository dashte bashim.
  // choon Nemikhaym be database asli request bezanim inja ye mock khali misazim va ba nemooneh i az TasksRepository providesh mikonim
  // ba code paeen ma ye module nest js sakhtim va barash TasksService va mock TasksRepository ro tareef kardim

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
    });
  });
});
