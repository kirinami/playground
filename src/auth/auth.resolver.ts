import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@ObjectType()
export class Auth {
  @Field(() => String)
  accessToken!: string;
}

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly localStrategy: LocalStrategy,
    private readonly authService: AuthService,
  ) {
  }

  @Query(() => Auth, { name: 'login' })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.localStrategy.validate(email, password);

    return this.authService.login(user);
  }

  @Mutation(() => Auth, { name: 'register' })
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    return this.authService.register({
      email,
      password,
      firstName,
      lastName,
    });
  }
}
