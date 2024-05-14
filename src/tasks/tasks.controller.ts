import { Task } from 'src/Models/task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body() { title, description }: { title: string; description: string },
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
