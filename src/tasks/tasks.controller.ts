import { Task } from 'src/Models/task.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/DTO/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
