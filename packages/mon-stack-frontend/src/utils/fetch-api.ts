import querystring from 'querystring';

export const FetchApi = async ({ url, method, headers, data }: any) => {
  let opts: any = { method };

  switch (method) {
    case 'POST':
      opts.body = JSON.stringify(data);
      break;
    default:
      url = `url?${querystring.encode(data)}`;
  }

  opts.headers = {
    ...headers,
    'Content-Type': 'application/json',
  };

  const response: any = await fetch(url, opts);
  return await response.json();
};
