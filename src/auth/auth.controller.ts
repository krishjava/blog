import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  home() {
    // this.authService.gencode();
    return { message: 'home' };
  }

  @Post('register')
  @HttpCode(200)
  async handleUser(@Body() userDto: UserDto): Promise<any> {
    return await this.authService.createUser(userDto);
  }
}
