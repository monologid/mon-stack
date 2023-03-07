import { NextApiRequest, NextApiResponse } from 'next';
import { ApiUtil } from '@/utils/api';
import { getBackendClient } from '@/libs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUtil = new ApiUtil(req, res, '/api/v1/[[...cortex]].ts');

  try {
    const accessToken: string = apiUtil.getAccessToken()
    const { slug, prompt, intent, language }: any = req.query

    switch (slug.join('/')) {
      case 'classify':
        if (req.method !== 'GET') return apiUtil.json({ error: { status: 405, name: 'MethodNotAllowed', message: 'Invalid request method.' } });
        apiUtil.json(await getBackendClient().cortex.setToken(accessToken).classify(prompt));
        break;
      case 'workflow':
        if (req.method !== 'GET') return apiUtil.json({ error: { status: 405, name: 'MethodNotAllowed', message: 'Invalid request method.' } });
        apiUtil.json(await getBackendClient().cortex.setToken(accessToken).workflow(intent, language));
        break;
      default:
        apiUtil.json({ error: { status: 404, name: 'NotFound', message: 'Invalid api path.' } });
    }
  } catch (e: any) {
    apiUtil
      .errorLog({ error: { status: 500, detail: e.toString() } })
      .json({ error: { status: 500, name: 'InternalServerError', message: 'Something went wrong.' } });
  }
}
