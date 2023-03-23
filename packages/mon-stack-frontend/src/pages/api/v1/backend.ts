import { NextApiRequest, NextApiResponse } from 'next';
import { ApiUtil } from '@/utils/api';
import { fetchApi } from '@/utils/fetch-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUtil = new ApiUtil(req, res, '/api/v1/backend.ts');

  try {
    if (req.method !== 'POST') {
      return apiUtil.json({
        error: { status: 405, name: 'MethodNotAllowed', message: 'Invalid request method.' },
      });
    }

    const { method, api, payload }: any = req.body;
    const baseApiUrl: string = process.env.MON_STACK_BACKEND_URL! || process.env.BASE_API_URL!;
    const url: string = `${baseApiUrl}${api}`;

    const opts: any = {
      url,
      method,
      headers: {
        'Content-Type': req.headers['content-type'] ? req.headers['content-type'] : 'application/json',
        Authorization: req.headers['authorization'] ? req.headers['authorization'] : '',
      },
      data: payload,
    };
    const response: any = await fetchApi(opts);
    if (response.error) return apiUtil.json({ ...response });

    apiUtil.json({ data: response.data ? response.data : response });
  } catch (e: any) {
    apiUtil
      .errorLog({ error: { status: 500, detail: e.toString() } })
      .json({ error: { status: 500, name: 'InternalServerError', message: 'Something went wrong.' } });
  }
}
