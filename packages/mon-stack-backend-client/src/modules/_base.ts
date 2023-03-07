import { fetchApi } from '../utils/fetch-api';

export interface IBaseClient {
  generateUrl(path: string): string;
  fetch(params: FetchSchema): Promise<any>;
}

export default class BaseClient implements IBaseClient {
  protected url: string;

  constructor({ url }: BaseConstructorSchema) {
    this.url = url;
  }

  generateUrl(path: string): string {
    return `${this.url}${path}`;
  }

  async fetch({ path, method, headers, body }: FetchSchema): Promise<any> {
    const url: string = this.generateUrl(path);
    return await fetchApi({ url, method, headers, body });
  }
}

export type BaseConstructorSchema = {
  url: string;
};

export type FetchSchema = {
  path: string;
  method: string;
  headers?: any;
  body?: any;
};
