import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthenticationModule } from '../authentication/authentication.module';
@Module({
  imports: [PrismaModule, AuthenticationModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
