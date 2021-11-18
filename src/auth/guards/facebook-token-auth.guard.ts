import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { getRequestFromContext } from '@/utils/get-request-from-context';
import { User } from '@/users/user.entity';

@Injectable()
export class FacebookTokenAuthGuard extends AuthGuard('facebook-token') {
  getRequest(context: ExecutionContext) {
    return getRequestFromContext(context);
  }

  handleRequest<U extends User>(err: Error, user: U) {
    if (err || !user) throw new UnauthorizedException();

    return user;
  }
}
