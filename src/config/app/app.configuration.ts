import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  serviceName: process.env.APP_SERVICE_NAME,
  jwtSecret: process.env.APP_JWT_SECRET,
  jwtExpiresIn: process.env.APP_JWT_EXPIRES_IN,
}));
