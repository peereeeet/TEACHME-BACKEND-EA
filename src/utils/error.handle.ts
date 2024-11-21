import { Response } from 'express';

export const handleHttp = (res: Response, message: string, error?: any) => {
  console.error(error || message);
  res.status(500).send({ error: message });
};
