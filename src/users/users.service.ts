import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async findAll(page: number, size: number) {
    return this.userRepository.find({
      skip: Math.abs(size * (page - 1)),
      take: Math.abs(size),
    });
  }

  async findOneById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
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
    }));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const password = updateUserDto.password ? await User.hashPassword(updateUserDto.password) : undefined;

    return this.userRepository.update(id, {
      ...updateUserDto,
      password,
    });
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }
}
