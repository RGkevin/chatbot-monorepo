import { GeneratorType, MessageGeneratorModel } from '../models';
import { ChatModel, MessageModel, UserModel } from '@chatbot/api-client';
import { messagesStore } from '../store';

export class ChatBotService {
  static async getOutput(
    inputMsg: MessageModel,
    chat: ChatModel,
    user: UserModel
  ): Promise<string> {
    const selectedGenerator = this.selectGenerator(inputMsg);

    return selectedGenerator.toContent({
      chat,
      user,
    });
  }

  static selectGenerator(input: MessageModel): MessageGeneratorModel {
    const highestGenerator = this.highestGenerator(input.content);
    const selectedGenerator = messagesStore[highestGenerator[0]];
    console.log('ChatBotService.selectGenerator', selectedGenerator);

    return selectedGenerator;
  }

  static matchesWithGenerators(content: string): [number, number][] {
    const offset = 1;

    return messagesStore
      .slice(offset)
      .reduce(
        (prev, currentGenerator, currentIndex) =>
          prev.concat([
            [currentIndex + offset, currentGenerator.match(content).length],
          ]),
        []
      );
  }

  static highestGenerator(content: string): [number, number] {
    const generatorsMatches = this.matchesWithGenerators(content);
    console.log(
      'ChatBotService.highestGenerator.generatorsMatches',
      generatorsMatches
    );

    return generatorsMatches.reduce(
      (prev, current) => {
        return current[1] > prev[1] ? current : prev;
      },
      [0, 0]
    );
  }
}
