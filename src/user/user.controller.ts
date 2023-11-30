import { Controller, Get, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { User } from './user.entity';
// import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private logger: Logger,
  ) {}

  @Get()
  getUsers() {
    this.logger.log('测试 logger');
    this.logger.error('测试错误 logger');
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
