import { Resolver } from '@nestjs/graphql';

import { User } from './user.entity';

@Resolver(() => User)
export class UsersResolver {
}
