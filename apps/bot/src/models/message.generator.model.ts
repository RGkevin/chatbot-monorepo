import { format } from 'util';
import { GeneratorType } from './enums';
import { ChatModel, UserModel } from '@chatbot/api-client';

export interface MessageGeneratorModelProps {
  template: string;
  keyWords: string[];
  type: GeneratorType;
}
export class MessageGeneratorModel {
  constructor({ template, keyWords, type }: MessageGeneratorModelProps) {
    this.template = template;
    this.keyWords = keyWords;
    this.type = type;
  }

  type: GeneratorType;

  template: string;

  keyWords: string[];

  match(inputContent: string) {
    if (this.keyWords.length === 0) {
      return [];
    }

    const pattern = `(${this.keyWords.join('|')})`;
    console.log('ChatBotService.matchInList pattern: ', pattern);

    const exp = new RegExp(pattern, 'gi');
    return inputContent.match(exp) || [];
  }

  toContent({ user, chat }: GeneratorContext) {
    let outputParams;

    switch (this.type) {
      case GeneratorType.ASK_ACTION:
        outputParams = [];
        break;
      case GeneratorType.CART_ACTION:
        outputParams = [];
        break;
      case GeneratorType.GOODBYE:
        outputParams = [];
        break;
      case GeneratorType.GREETINGS:
        outputParams = [user.name];
        break;
      case GeneratorType.PAYMENT_NOTIFICATION:
        outputParams = [];
        break;
      case GeneratorType.PRODUCTS_DISPLAY:
        outputParams = [];
        break;
      case GeneratorType.PRODUCT_DETAILS:
        outputParams = [];
        break;
      case GeneratorType.UNKNOWN:
      default:
        outputParams = [];
        break;
    }
    return format(this.template, ...outputParams);
    // return outputContent;
  }
}

export interface GeneratorContext {
  user: UserModel;
  chat: ChatModel;
}
