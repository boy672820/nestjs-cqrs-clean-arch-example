import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  otpService: process.env.APP_OTP_SERVICE,
}));
