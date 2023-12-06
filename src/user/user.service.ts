import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getUserDto } from './interface/get-user-dto';
import { conditionUtils } from 'src/utils/db.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User) {
    const userTmp = await this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }

  findAll(query: getUserDto) {
    console.log(
      '🚀 ~ file: user.service.ts:19 ~ UserService ~ findAll ~ query:',
      query,
    );
    const { page, limit, username, role, gender } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;
    // return this.userRepository.find({
    //   relations: ['profile', 'roles'],
    //   select: {
    //     username: true,
    //     id: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take,
    //   skip,
    // });
    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };
    const queryBuild = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');
    // .where('user.username = :username', { username })
    // .where('profile.gender = :gender', { gender })
    // .getMany();

    const newQuery = conditionUtils<User>(queryBuild, obj);
    return newQuery.take(take).skip(skip).getMany();
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }
}
