import { Task, TaskStatus } from 'src/Models/task.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/DTO/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);
    return task;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    const tasks = this.tasksService.deleteTaskById(id);
    return tasks;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() { status }: { status: TaskStatus },
  ) {
    return this.tasksService.updateTaskById(id, status);
  }
}
