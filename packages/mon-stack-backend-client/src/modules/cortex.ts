import BaseClient, { BaseConstructorSchema } from './_base';

export interface ICortex {
  setToken(token: string): ICortex;
  classify(prompt: string): Promise<any>;
  workflow(intent: string, language?: string): Promise<any>;
}

export default class Cortex extends BaseClient implements ICortex {
  private token: string;

  constructor({ url }: CortexConstructorSchema) {
    super({ url });
    this.token = '';
  }

  setToken(token: string): ICortex {
    this.token = token;
    return this;
  }

  async classify(prompt: string): Promise<any> {
    return await this.fetch({
      path: '/api/v1/cortex/classify',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        prompt,
      },
    });
  }

  async workflow(intent: string, language?: string): Promise<any> {
    return await this.fetch({
      path: '/api/v1/cortex/workflow',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: {
        intent,
        language,
      },
    });
  }
}

export interface CortexConstructorSchema extends BaseConstructorSchema {}
