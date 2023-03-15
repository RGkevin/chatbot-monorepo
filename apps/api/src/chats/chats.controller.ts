import { Controller, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly authService: AuthenticationService
  ) {}

  @Post()
  async createChat() {
    const userName = 'something from request';
    // create new user
    const newUser = await this.authService.createNewUserFromName(userName);
    // create new chat for new user
    return await this.chatsService.createChat(newUser);
  }
}
