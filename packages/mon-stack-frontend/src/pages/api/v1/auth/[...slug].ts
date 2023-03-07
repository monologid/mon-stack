import { NextApiRequest, NextApiResponse } from 'next';
import { ApiUtil } from '@/utils/api';
import { getBackendClient } from '@/libs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUtil = new ApiUtil(req, res, '/api/v1/[[...auth]].ts');

  try {
    const { slug }: any = req.query;

    switch (slug.join('/')) {
      case 'login':
        apiUtil.json(await getBackendClient().auth.login(req.body));
        break;
      case 'register':
        apiUtil.json(await getBackendClient().auth.register(req.body));
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
