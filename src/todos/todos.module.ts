import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@/users/users.module';

import { TodoRepository } from './todo.repository';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoRepository,
    ]),
    forwardRef(() => UsersModule),
  ],
  providers: [TodosService, TodosResolver],
  controllers: [TodosController],
  exports: [TodosService],
})
export class TodosModule {
}
