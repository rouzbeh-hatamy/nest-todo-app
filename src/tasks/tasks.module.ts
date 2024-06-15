import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { DataSource } from 'typeorm';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TASKS_REPOSITORY',
      useFactory: (dataSource: DataSource) => new TasksRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
