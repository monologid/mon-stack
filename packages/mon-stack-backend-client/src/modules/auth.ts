import BaseClient, { BaseConstructorSchema } from './_base';

export interface IAuth {
  register({ fullname, email, password }: AuthRegisterSchema): Promise<any>;
  login({ email, password }: AuthLoginSchema): Promise<any>;
}

export class Auth extends BaseClient implements IAuth {
  constructor({ url }: AuthConstructorSchema) {
    super({ url });
  }

  async register({ fullname, email, password }: AuthRegisterSchema): Promise<any> {
    return await this.fetch({
      path: '/api/auth/local/register',
      method: 'POST',
      body: { username: fullname, email, password },
    });
  }

  async login({ email, password }: AuthLoginSchema): Promise<any> {
    return await this.fetch({
      path: '/api/auth/local',
      method: 'POST',
      body: { identifier: email, password },
    });
  }
}

export interface AuthConstructorSchema extends BaseConstructorSchema {}

export type AuthRegisterSchema = {
  fullname: string;
  email: string;
  password: string;
};

export type AuthLoginSchema = {
  email: string;
  password: string;
};
