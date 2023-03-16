import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [PrismaModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
