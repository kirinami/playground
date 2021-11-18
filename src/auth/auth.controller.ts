import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { User } from '@/users/user.entity';

import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SocialNetworkDto } from './dto/social-network.dto';
import { FacebookTokenAuthGuard } from './guards/facebook-token-auth.guard';
import { GoogleTokenAuthGuard } from './guards/google-token-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiBody({ type: SocialNetworkDto })
  @UseGuards(FacebookTokenAuthGuard)
  @Post('facebook')
  @HttpCode(HttpStatus.OK)
  async facebook(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @ApiBody({ type: SocialNetworkDto })
  @UseGuards(GoogleTokenAuthGuard)
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async google(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
