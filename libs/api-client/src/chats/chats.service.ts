import { ChatModel } from './chat.model';

export const createChat = async (
  baseUrl: string,
  name: string
): Promise<ChatModel> => {
  const res = await fetch(baseUrl + '/chats', {
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return ChatModel.fromPlain(await res.json());
};
