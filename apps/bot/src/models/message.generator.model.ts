import { format } from 'util';

export class MessageGeneratorModel {
  constructor(template: string) {
    this.template = template;
  }

  template: string;

  toContent(...args) {
    return format(this.template, ...args);
  }
}
