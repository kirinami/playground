import { DefaultValuePipe } from '@nestjs/common';
import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { JwtAuth } from '@/auth/decorators/jwt-auth.decorator';
import { Todo } from '@/todos/todo.entity';
import { TodosService } from '@/todos/todos.service';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly todosService: TodosService,
    private readonly usersService: UsersService,
  ) {
  }

  @JwtAuth()
  @Query(() => [User], { name: 'retrieveUsers' })
  async retrieve(
    @Args('page', { type: () => Int, nullable: true }, new DefaultValuePipe(1)) page: number,
    @Args('size', { type: () => Int, nullable: true }, new DefaultValuePipe(10)) size: number,
  ) {
    return this.usersService.findAll(page, size);
  }

  @ResolveField(() => [Todo], { name: 'todos' })
  async resolveTodos(@Parent() user: User) {
    return this.todosService.findAllByUserId(user.id);
  }
}
