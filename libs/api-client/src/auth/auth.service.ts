import { UserModel } from './user.model';

export const findUserById = async (userId: number): Promise<UserModel> => {
  console.log('findUserById', userId);
  return UserModel.fromPlain({
    id: 1,
    name: 'sdjkfa',
  });
};
