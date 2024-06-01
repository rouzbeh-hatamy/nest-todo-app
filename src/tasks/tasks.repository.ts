import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/DTO/create-task.dto';
import { TaskStatus } from 'src/Models/task-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = {
      title,
      description,
      status: TaskStatus.OPEN,
    };
    const task = this.create(newTask);

    await this.save(task);
    return task;
  }
}
