import { format } from 'util';
import { GeneratorType } from './enums';

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

  toContent(...args) {
    return format(this.template, ...args);
  }
}
