import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/Models/task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
