import { NextApiRequest, NextApiResponse } from 'next';

export interface IApiUtil {
  getAccessToken(): any;
  json(params: ApiResponseSchema): any;
  errorLog(params: ApiLogSchema): any;
}

export class ApiUtil implements IApiUtil {
  req: NextApiRequest;
  res: NextApiResponse;
  filepath: string | undefined;

  constructor(req: NextApiRequest, res: NextApiResponse, filepath?: string | undefined) {
    this.req = req;
    this.res = res;
    this.filepath = filepath;
  }

  // TODO: implement nookies if headers.authorization is empty
  getAccessToken(): any {
    const { headers }: any = this.req
    return headers.authorization ? headers.authorization.replaceAll('Bearer ', '') : null
  }

  json({ data, error }: ApiResponseSchema) {
    if (error) {
      return this.res.status(error.status || 500).json({ error });
    }

    this.res.status(data.status || 200).json({ data });
  }

  errorLog({ error }: ApiLogSchema): any {
    console.dir({
      filepath: this.filepath,
      error
    })

    return this;
  }
}

export type ApiResponseSchema = {
  data?: any;
  error?: any;
};

export type ApiLogSchema = {
  error?: any;
};
