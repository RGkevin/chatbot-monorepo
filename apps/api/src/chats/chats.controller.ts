import { Controller, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly authService: AuthenticationService
  ) {}

  @Post()
  async createChat(@Body() body: { name: string }) {
    // create new user
    const newUser = await this.authService.createNewUserFromName(body.name);

    // create new chat for new user
    return await this.chatsService.createChat(newUser);
  }
}
