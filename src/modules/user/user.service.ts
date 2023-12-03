import { Injectable } from '@nestjs/common';
import { User } from '@common/database/entities';
import { AppConfigService } from '@config';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ulid } from 'ulid';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly appConfigService: AppConfigService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const id = ulid();
    const user = this.userRepository.create({
      ...dto,
      id,
      createdAt: new Date(),
    });
    await this.em.persistAndFlush(user);
  }

  /**
   * Generate secret for OTP
   *
   * and save it to database
   *
   * @param userId - user id
   * @returns OTP Auth URL as Buffer for QR code
   */
  async generateSecret(userId: string): Promise<Buffer> {
    const secret = authenticator.generateSecret();

    const userRef = this.em.getReference(User, userId);
    userRef.otpSecret = secret;

    await this.em.persistAndFlush(userRef);

    const otpAuthUrl = authenticator.keyuri(
      userId,
      this.appConfigService.serviceName,
      secret,
    );
    const base64 = await toDataURL(otpAuthUrl);
    const buffer = Buffer.from(
      base64.replace('data:image/png;base64,', ''),
      'base64',
    );

    return buffer;
  }
}
