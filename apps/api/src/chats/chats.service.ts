import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  createChat(user: User) {
    const data: Prisma.ChatCreateInput = {
      user: {
        connect: {
          id: user.id,
        },
      },
    };

    return this.prisma.chat.create({
      data,
    });
  }
}
