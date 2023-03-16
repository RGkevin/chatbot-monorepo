import { plainToInstance, instanceToPlain } from 'class-transformer';

export class MessageModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  content: string;
  userId: number;

  chatId: number;

  static fromPlain(plain: unknown) {
    return plainToInstance(MessageModel, plain);
  }

  toPlain() {
    return instanceToPlain(this);
  }
}
