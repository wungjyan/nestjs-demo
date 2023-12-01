import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
// import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './interface/get-user-dto';
// import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get()
  getUsers(@Query() query: getUserDto) {
    // query 传递过来的参数都是 string 类型
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body() params: any) {
    return this.userService.create(params);
  }

  @Get('profile')
  getProfile() {
    return this.userService.findProfile(2);
  }
}
