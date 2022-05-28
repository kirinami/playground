import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_USER,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
      logging: ['query', 'warn', 'error'],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      introspection: true,
      playground: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      formatError: (error: any) => ({
        message: error.extensions?.exception?.response?.message || error.extensions?.response?.message || error.message,
        code: error.extensions?.code || 'SERVER_ERROR',
        name: error.extensions?.exception?.name || error.name,
      }),
    }),
    AuthModule,
    TodosModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
