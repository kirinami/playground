import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async findOneById(id: number, relations?: string[]) {
    if (relations && !relations.includes('todos')) throw new BadRequestException();

    return this.userRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneByCredentials(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) return null;

    const match = await User.comparePassword(password, user.password);
    if (!match) return null;

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const password = await User.hashPassword(createUserDto.password);

    return this.userRepository.save(this.userRepository.create({
      ...createUserDto,
      password,
    }))
      .catch((err) => {
        if (/(email)[\s\S]+(already exists)/.test(err.detail)) {
          throw new BadRequestException(['email already exists']);
        }
        return err;
      });
  }
}
