import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  addUser() {
    const user = { username: '汪健', password: '123456' } as User;
    return this.userService.create(user);
  }

  @Get('profile')
  getProfile() {
    return this.userService.findProfile(2);
  }
}
