import { PORT } from '../index';

export const generateLink = (id: string): string => {
  const domain = process.env.DOMAIN || `localhost:${PORT}`;
  return `http://${domain}/fixtures/${id}`;
}