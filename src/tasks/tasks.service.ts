import { TasksRepository } from './tasks.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/DTO/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from 'src/Models/task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: TasksRepository,
  ) {}

  async getAllTasks(user: User, filterDto?: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(user, filterDto);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<Task[]> {
    const task = await this.tasksRepository.delete({ id, user });
    if (task.affected === 0) {
      throw new NotFoundException('nadariiim');
    }
    const tasks = await this.getAllTasks(user);
    return tasks;
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = {
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    };
    const task = this.tasksRepository.create(newTask);

    await this.tasksRepository.save(task);
    return task;
  }
}
