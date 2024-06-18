import { TaskStatus } from '../task.entity';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
