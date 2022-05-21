import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TokensModule } from '@/tokens/tokens.module';
import { UsersModule } from '@/users/users.module';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    TokensModule,
    UsersModule,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    AuthService,
    AuthResolver,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
}
