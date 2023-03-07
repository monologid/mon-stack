import querystring from 'querystring';

export type fetchApiParams = {
  url: string;
  method: string;
  headers: any;
  body: any;
};

export async function fetchApi({ url, method = 'GET', headers, body }: fetchApiParams) {
  try {
    const opts: any = { method };

    switch (method) {
      case 'POST':
        opts.body = JSON.stringify(body);
        headers = { ...headers, 'Content-Type': 'application/json' };
        break;
      default:
        url = `${url}?${querystring.encode(body)}`;
    }

    opts.headers = {
      ...headers,
    };

    const response: any = await fetch(url, opts);
    const data: any = await response.json();
    if (data.error) return { error: data.error };
    if (data.data) return { data: data.data };
    return { data };
  } catch (e: any) {
    return {
      ...e.response.data,
    };
  }
}
