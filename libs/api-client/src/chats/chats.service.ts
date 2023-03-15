import { ChatModel } from './chat.model';

export const createChat = async (
  host: string,
  name: string
): Promise<ChatModel> => {
  const res = await fetch(host + '/api/chats', {
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return ChatModel.fromPlain(await res.json());
};
