import { TasksRepository } from './tasks.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/DTO/create-task.dto';
import { GetTaskFilterDto } from 'src/tasks/DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from 'src/Models/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: TasksRepository,
  ) {}

  async getAllTasks(filterDto?: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<Task[]> {
    const task = await this.tasksRepository.delete(id);
    if (task.affected === 0) {
      throw new NotFoundException('nadariiim');
    }
    const tasks = await this.getAllTasks();
    return tasks;
  }

  async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = {
      title,
      description,
      status: TaskStatus.OPEN,
    };
    const task = this.tasksRepository.create(newTask);

    await this.tasksRepository.save(task);
    return task;
  }
}
