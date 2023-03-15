import { plainToInstance, instanceToPlain } from 'class-transformer';

export class ChatModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  room: string;
  userId: number;

  static fromPlain(plain: unknown) {
    return plainToInstance(ChatModel, plain);
  }

  toPlain() {
    return instanceToPlain(this);
  }
}
