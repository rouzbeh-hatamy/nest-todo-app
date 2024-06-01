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
  // getAllTasks(): Task[] {
  //   return this.Tasks;
  // }
  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((item) => item.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((item) => item.title.includes(search));
  //   }
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    return task;
  }
  // deleteTaskById(id: string): Task[] {
  //   const task = this.getTaskById(id);
  //   if (!task) {
  //     throw new NotFoundException('nadariiim');
  //   }
  //   this.Tasks = this.Tasks.filter((item) => item.id !== id);
  //   return this.Tasks;
  // }
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
