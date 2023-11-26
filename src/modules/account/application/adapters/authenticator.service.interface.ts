export interface IAuthenticatorService {
  generate(userId: string): string;
}
