import { UserModel } from './user.model';

export const findUserById = async (
  baseUrl: string,
  userId: number
): Promise<UserModel> => {
  const url = baseUrl + '/auth/users/' + userId;
  console.log('findUserById', url, userId);
  const res = await fetch(url, {
    method: 'GET',
  });
  console.log('res ok', res.ok);

  return UserModel.fromPlain(await res.json());
};
