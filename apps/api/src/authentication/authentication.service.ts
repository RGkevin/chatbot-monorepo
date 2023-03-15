import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(private prismaService: PrismaService) {}

  createNewUserFromName(name: string) {
    return this.prismaService.user.create({data: {
      name,
      role: 'USER',
    }});
  }
}
