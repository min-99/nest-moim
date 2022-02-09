import { Injectable } from '@nestjs/common';
import { MocksService } from 'src/mocks/mocks.service';

@Injectable()
export class UsersService {
  constructor(private readonly mocksService: MocksService) {}

  async findOne(username: string) {
    const users = await this.mocksService.getUsers();
    return users.find((user) => user.username === username);
  }
}
