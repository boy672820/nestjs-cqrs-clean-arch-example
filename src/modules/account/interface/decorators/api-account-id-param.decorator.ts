import { ApiParam } from '@nestjs/swagger';

export function ApiAccountIdParam() {
  return ApiParam({
    name: 'id',
    type: 'string',
    description: 'Account id',
    example: '01HBTTAG5C1PDRS1K1HXRHKW1N',
  });
}
