import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
