import { registerAs } from '@nestjs/config';

export default registerAs('wallet', () => ({
  phrase: process.env.WALLET_PHRASE,
  password: process.env.WALLET_PASSWORD,
}));
