import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from 'src/tasks/DTO/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

//har ja @Injectable() zadi oontaraf ham @Inject() niazeh
@Injectable()
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository');
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(user: User, filterDto?: GetTaskFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (filterDto) {
      const { status, search } = filterDto;

      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        // aval hame chizo lower case mikone,rooye title va desc migarde, Like yani partial ham okeye
        // %{search}% yani age partial ham bood text ma okeye
        // %: In SQL, the % wildcard represents zero or more characters. So, wrapping search with % means "match any sequence of characters before and after the search term"
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          { search: `%${search}%` },
        );
      }
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`user: ${user.username} , error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }
}
