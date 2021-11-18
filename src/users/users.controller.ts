import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuth } from '@/auth/decorators/jwt-auth.decorator';

import { UsersService } from './users.service';
import { User } from './user.entity';

@ApiTags('users')
@JwtAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('profile')
  async retrieveProfile(@CurrentUser() user: User) {
    return this.usersService.findOneById(user.id);
  }
}

