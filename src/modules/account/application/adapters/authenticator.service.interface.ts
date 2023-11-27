type GeneratedAuthenticator = {
  secret: string;
  token: string;
  otpAuthUrl: string;
};

export interface IAuthenticatorService {
  /**
   * Generates a new authenticator for the given user.
   *
   * @param userId The user id.
   */
  generate(userId: string): GeneratedAuthenticator;

  /**
   * Generates a QR code data URL for the given OTP auth URL.
   *
   * @param otpAuthUrl The OTP auth URL.
   */
  toDataURL(otpAuthUrl: string): Promise<string>;
}
