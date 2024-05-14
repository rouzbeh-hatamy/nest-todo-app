import { TaskStatus } from 'src/Models/task.model';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
