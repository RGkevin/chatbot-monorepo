import { GeneratorType, MessageGeneratorModel } from '../models';
import { MessageModel } from '@chatbot/api-client';

export class ChatBotService {
  constructor() {
    // set default generators
    this.generators = this.getDefaultGenerators();
  }

  generators: MessageGeneratorModel[];

  getDefaultGenerators() {
    const gens = [];
    for (const genTypeMember in GeneratorType) {
      console.log('enum member: ', GeneratorType[genTypeMember]);
      // TODO how to organize generators
      gens.push(new MessageGeneratorModel('foo'));
    }
    return [];
  }

  async getOutput(input: MessageModel): Promise<string> {
    return 'hola output prueba' + input.content;
  }
}
