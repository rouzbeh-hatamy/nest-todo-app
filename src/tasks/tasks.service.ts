import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from 'src/DTO/create-task.dto';
import { GetTaskFilterDto } from 'src/DTO/get-tasks-filter.dto';
import { Task, TaskStatus } from 'src/Models/task.model';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.Tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((item) => item.status === status);
    }

    if (search) {
      tasks = tasks.filter((item) => item.title.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.Tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    return task;
  }

  deleteTaskById(id: string): Task[] {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    this.Tasks = this.Tasks.filter((item) => item.id !== id);
    return this.Tasks;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException('nadariiim');
    }
    task.status = status;
    return task;
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
