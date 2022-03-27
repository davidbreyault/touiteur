export class Authentication {
  constructor(
    public isAuthenticated: boolean,
    public bearerToken?: string,
    public username?: string
  ) {}
}