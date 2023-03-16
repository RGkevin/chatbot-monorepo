import { GeneratorType, MessageGeneratorModel } from '../models';

export const messagesStore = {
  [GeneratorType.GREETINGS]: new MessageGeneratorModel(''),
};
