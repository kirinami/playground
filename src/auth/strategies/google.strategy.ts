import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import Strategy, { Profile } from 'passport-google-oauth-token';
import uuid from 'uuid';

import { UsersService } from '@/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails.find(email => email.verified)?.value || profile.emails[0]?.value;
    if (!email) throw new UnauthorizedException();

    let user = await this.usersService.findOneByEmail(email);
    if (!user) {
      user = await this.usersService.create({
        email,
        password: uuid.v4(),
        firstName: profile.name?.givenName || 'John',
        lastName: profile.name?.familyName || 'Doe',
      });
      if (!user) throw new BadRequestException();
    }

    return user;
  }
}
