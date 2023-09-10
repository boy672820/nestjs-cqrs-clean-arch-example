import { registerAs } from '@nestjs/config';

export default registerAs('coinbase', () => ({
  phrase: process.env.COINBASE_PHRASE,
  password: process.env.COINBASE_PASSWORD,
}));
