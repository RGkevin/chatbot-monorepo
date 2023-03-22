import { UserModel } from './user.model';

export const findUserById = async (
  baseUrl: string,
  userId: number
): Promise<UserModel> => {
  const url = baseUrl + '/auth/users/' + userId;
  const res = await fetch(url, {
    method: 'GET',
  });
  console.log('res ok', res.ok);
  if (!res.ok) {
    throw new Error(`Error finding user ${userId}`);
  }

  return UserModel.fromPlain(await res.json());
};
