import { plainToInstance, instanceToPlain } from 'class-transformer';

export class UserModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  role: string;

  static fromPlain(plain: unknown) {
    return plainToInstance(UserModel, plain);
  }

  toPlain() {
    return instanceToPlain(this);
  }
}
