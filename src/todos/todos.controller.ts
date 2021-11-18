import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuth } from '@/auth/decorators/jwt-auth.decorator';
import { User } from '@/users/user.entity';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('todos')
@JwtAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this.todosService.findOneById(id);
  }

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: User,
  ) {
    return this.todosService.create({
      ...createTodoDto,
      userId: user.id,
    });
  }

  @Patch(':id')
  update(
    @Param() id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() user: User,
  ) {
    return this.todosService.update(id, {
      ...updateTodoDto,
      userId: user.id,
    });
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.todosService.delete(id);
  }
}
