import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, In } from 'typeorm';
import { groupBy } from 'lodash';

import { createDataLoader } from '@/utils/create-data-loader';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async findOneById(id: number, relations?: string[]) {
    if (relations && !relations.includes('user')) throw new BadRequestException();

    return this.todoRepository.findOne({
      where: {
        id,
      },
      relations,
    });
  }

  async findAllByUserId(userId: number, relations?: string[]) {
    if (relations && !relations.includes('user')) throw new BadRequestException();

    return this.todoRepository.find({
      where: {
        userId,
      },
      relations,
    });
  }

  async loadAllByUserId(userId: number) {
    return createDataLoader<number, Todo[]>('todos/findAllByUserId', async (userIds) => {
      const todos = await this.todoRepository.find({
        where: {
          userId: In(userIds),
        },
      });

      return groupBy(todos, 'userId');
    }, [])
      .load(userId);
  }

  async create(partialTodo: DeepPartial<Todo>) {
    return this.todoRepository.save(this.todoRepository.create(partialTodo));
  }

  async update(id: number, partialTodo: DeepPartial<Todo>) {
    return this.todoRepository.update(id, partialTodo);
  }

  async delete(id: number) {
    return this.todoRepository.delete(id);
  }
}
