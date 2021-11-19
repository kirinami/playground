import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { JwtAuth } from '@/auth/decorators/jwt-auth.decorator';
import { User } from '@/users/user.entity';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@ApiTags('todos')
@JwtAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @ApiOkResponse({
    description: 'Ok',
    type: Todo,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string' },
      },
    },
  })
  @ApiQuery({
    name: 'relations',
    type: 'string',
    isArray: true,
    style: 'form',
    explode: false,
    required: false,
    allowEmptyValue: false,
  })
  @Get()
  async retrieveAll(@CurrentUser() user: User, @Query('relations') relations?: string) {
    return this.todosService.findAllByUserId(user.id, relations?.split(',').map(r => r.trim()).filter(Boolean));
  }

  @ApiOkResponse({
    description: 'Ok',
    type: Todo,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string' },
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
  @ApiQuery({
    name: 'relations',
    type: 'string',
    isArray: true,
    style: 'form',
    explode: false,
    required: false,
    allowEmptyValue: false,
  })
  @Get(':id')
  async retrieveById(@Param('id') id: number, @Query('relations') relations?: string) {
    const todo = await this.todosService.findOneById(id, relations?.split(',').map(r => r.trim()).filter(Boolean));
    if (!todo) throw new NotFoundException();

    return todo;
  }

  @ApiOkResponse({
    description: 'Ok',
    type: Todo,
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
  @ApiQuery({
    name: 'relations',
    type: 'string',
    isArray: true,
    style: 'form',
    explode: false,
    required: false,
    allowEmptyValue: false,
  })
  @Post()
  async create(@CurrentUser() user: User, @Body() createTodoDto: CreateTodoDto, @Query('relations') relations?: string) {
    const { id } = await this.todosService.create({ ...createTodoDto, userId: user.id });

    const todo = await this.todosService.findOneById(id, relations?.split(',').map(r => r.trim()).filter(Boolean));
    if (!todo) throw new InternalServerErrorException();

    return todo;
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
