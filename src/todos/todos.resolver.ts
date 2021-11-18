import { Query, Resolver } from '@nestjs/graphql';

import { JwtAuth } from '@/auth/decorators/jwt-auth.decorator';

import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(
    private readonly todosService: TodosService,
  ) {
  }

  @JwtAuth()
  @Query(() => [Todo], { name: 'retrieveTodos' })
  async retrieve() {
    return this.todosService.findAll();
  }
}
