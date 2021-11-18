import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoRepository } from './todo.repository';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoRepository,
    ]),
  ],
  providers: [TodosService, TodosResolver],
  controllers: [TodosController],
  exports: [TodosService],
})
export class TodosModule {
}
