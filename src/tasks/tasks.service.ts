import { TasksRepository } from './tasks.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/DTO/create-task.dto';
import { GetTaskFilterDto } from 'src/DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from 'src/Models/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const tasks = this.tasksRepository.find({ where: { status } });
    return tasks;
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

  // updateTaskById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   if (!task) {
  //     throw new NotFoundException('nadariiim');
  //   }
  //   task.status = status;
  //   return task;
  // }

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
