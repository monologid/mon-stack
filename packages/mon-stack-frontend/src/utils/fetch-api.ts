import axios from 'axios';

export type fetchApiParams = {
  url: string;
  method: string;
  headers: any;
  data: any;
};

export async function fetchApi({ url, method = 'GET', headers, data }: fetchApiParams) {
  try {
    const response: any = await axios({ method, url, headers, data });
    return response.data || {};
  } catch (e: any) {
    if (e.response && e.response.data) {
      return {
        data: null,
        ...e.response.data,
      };
    }

    return {
      error: {
        status: 500,
        name: 'InternalServerError',
        message: 'Something went wrong.',
        e: e.toString(),
      },
    };
  }
}
