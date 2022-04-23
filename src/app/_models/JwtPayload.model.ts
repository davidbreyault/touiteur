export class JwtPayload {
  fresh!: boolean;
  iat!: number;
  jti!: string;
  type!: string;
  sub!: {
    name: string,
    expiration: string
  };
  nbf!: number;
  exp!: number;
}