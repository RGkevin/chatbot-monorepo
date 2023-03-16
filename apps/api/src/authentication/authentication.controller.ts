import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get('/users/:userId')
  async findUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.findUserById(userId);
  }
}
