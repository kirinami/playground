import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiOkResponse({
    description: 'Ok',
  })
  @Get()
  async retrieveAll() {
    return this.todosService.findAll();
  }

  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string' },
      },
    },
  })
  @Get(':id')
  async retrieveById(@Param('id') id: number) {
    const todo = await this.todosService.findOneById(id);
    if (!todo) throw new NotFoundException();

    return todo;
  }

  @ApiOkResponse({
    description: 'Ok',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string' },
      },
    },
  })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @CurrentUser() user: User) {
    return this.todosService.create({ ...createTodoDto, userId: user.id });
  }

  @ApiOkResponse({
    description: 'Ok',
    schema: {
      properties: {
        affected: { type: 'number' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto, @CurrentUser() user: User) {
    const { affected } = await this.todosService.update(id, { ...updateTodoDto, userId: user.id });
    if (affected === 0) throw new NotFoundException();

    return {
      affected,
    };
  }

  @ApiOkResponse({
    description: 'Ok',
    schema: {
      properties: {
        affected: { type: 'number' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string' },
      },
    },
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const { affected } = await this.todosService.delete(id);
    if (affected === 0) throw new NotFoundException();

    return {
      affected,
    };
  }
}
