import { TaskStatus } from 'src/Models/task-status.enum';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
