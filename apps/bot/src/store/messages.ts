import { GeneratorType, MessageGeneratorModel } from '../models';

export const messagesStore: MessageGeneratorModel[] = [
  new MessageGeneratorModel({
    keyWords: [],
    template: 'Hi %s, welcome to ChatBot Demo! How can I help you?',
    type: GeneratorType.GREETINGS,
  }),
  new MessageGeneratorModel({
    keyWords: [],
    template: "Sorry I couldn't process your requirement",
    type: GeneratorType.UNKNOWN,
  }),
  new MessageGeneratorModel({
    keyWords: ['what', 'which', 'product', 'is', 'are'],
    template:
      'The available products are: <ol><li>Product Name 1</li><li>Product Name 2</li><li>Product Name 3</li></ol>>',
    type: GeneratorType.PRODUCTS_DISPLAY,
  }),
  new MessageGeneratorModel({
    keyWords: [],
    template: 'Hi %s, welcome to ChatBot Demo! How can I help you?',
    type: GeneratorType.CART_ACTION,
  }),
  new MessageGeneratorModel({
    keyWords: [],
    template: 'Hi %s, welcome to ChatBot Demo! How can I help you?',
    type: GeneratorType.ASK_ACTION,
  }),
  new MessageGeneratorModel({
    keyWords: [],
    template: 'Hi %s, welcome to ChatBot Demo! How can I help you?',
    type: GeneratorType.PAYMENT_NOTIFICATION,
  }),
];
