import { BaseConstructorSchema } from './modules/_base';
import { Auth, IAuth } from './modules/auth';
import Cortex, { ICortex } from './modules/cortex';

export default class BackendClient {
  public auth: IAuth;
  public cortex: ICortex;

  constructor({ url }: BaseConstructorSchema) {
    this.auth = new Auth({ url });
    this.cortex = new Cortex({ url });
  }
}
