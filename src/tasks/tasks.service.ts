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

  getTaskById(id: string): Task {
    return this.Tasks.find((item) => item.id === id);
  }

  deleteTaskById(id: string): Task[] {
    this.Tasks = this.Tasks.filter((item) => item.id !== id);
    return this.Tasks;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    this.Tasks = this.Tasks.map((item) =>
      item.id === id ? { ...item, status } : { ...item },
    );
    return this.Tasks.find((item) => item.id === id);
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
