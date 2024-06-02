import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDTO } from './DTO/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: UsersRepository,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }
}
