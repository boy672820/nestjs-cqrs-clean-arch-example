export interface IAuthenticatorService {
  /**
   * Verifies the given token for the given user.
   *
   * @param secret The secret to verify.
   * @param token The token to verify.
   */
  verify(secret: string, token: string): boolean;
}
