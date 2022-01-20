import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger('ProductsController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    console.log('signup ', authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/')
  getUser(@GetUser() user: User): User {
    console.log('current user ', user);
    return user;
  }
}
