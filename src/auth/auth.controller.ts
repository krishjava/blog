import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  home(){
    return {message : 'home' };
  }

  @Post('register')
  @HttpCode(200)
  async handleUser(@Body() userDto: UserDto): Promise<any> {
    return await this.authService.createUser(userDto);
  }
}
