import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from 'src/DTO/create-task.dto';
import { Task, TaskStatus } from 'src/Models/task.model';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.Tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.Tasks.push(task);
    return task;
  }
}
