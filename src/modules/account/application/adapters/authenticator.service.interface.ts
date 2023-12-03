export interface IAuthenticatorService {
  /**
   * Verifies the given token for the given user.
   *
   * @param secret The secret to verify.
   * @param token The token to verify.
   */
  verify(secret: string, token: string): boolean;

  /**
   * Sign jwt with account id.
   *
   * @param userId The user id to sign.
   * @param accountId The account id to sign.
   */
  sign(userId: string, accountId: string): string;

  /**
   * Verify json web token.
   *
   * @param token The token to verify.
   */
  verifyJwt(token: string): { userId: string; accountId: string };
}
