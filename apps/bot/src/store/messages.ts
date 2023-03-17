import { GeneratorType, MessageGeneratorModel } from '../models';

export const messagesStore: MessageGeneratorModel[] = [
  new MessageGeneratorModel({
    keyWords: [],
    template: "Sorry I couldn't process your requirement",
    type: GeneratorType.UNKNOWN,
  }),
  new MessageGeneratorModel({
    keyWords: ['hi', 'hello', 'need', 'help'],
    template: 'Hi %s, welcome to ChatBot Demo! How can I help you?',
    type: GeneratorType.GREETINGS,
  }),
  new MessageGeneratorModel({
    keyWords: ['what', 'which', 'product', 'is', 'are'],
    template:
      'The available products are: <ol><li>Product Name 1</li><li>Product Name 2</li><li>Product Name 3</li></ol>>',
    type: GeneratorType.PRODUCTS_DISPLAY,
  }),
  new MessageGeneratorModel({
    keyWords: ['no', 'I don', 'thanks'],
    template: 'Thank you, good bye!',
    type: GeneratorType.GOODBYE,
  }),
  new MessageGeneratorModel({
    keyWords: ['add', 'product', 'cart'],
    template:
      'Product added to the card. Do you want to pay this order with your primary credit card for a total of $234?',
    type: GeneratorType.ASK_ACTION,
  }),
  new MessageGeneratorModel({
    keyWords: ['yes', 'pay', 'order', 'card'],
    template:
      'Payment authorized. Thank you for your purchase. Do you need help with anything else?',
    type: GeneratorType.PAYMENT_NOTIFICATION,
  }),
  new MessageGeneratorModel({
    keyWords: ['what', 'price', 'is', 'product'],
    template: 'The price of the product is $55.50',
    type: GeneratorType.PRODUCT_DETAILS,
  }),
];
