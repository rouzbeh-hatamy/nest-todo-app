import { Exclude } from 'class-transformer';
import { TaskStatus } from 'src/Models/task-status.enum';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  // exclude mige ke in ro nafrest, bayad ba interceptor mortabetesh (TransformInterceptor) hamrah bashe
  // user req mizane => process mishe => response amadeh mishe => global interceptor rooye response process mikone va exclude ha ro hazf mikone => response ferestadeh mishe
  user: User;
}
