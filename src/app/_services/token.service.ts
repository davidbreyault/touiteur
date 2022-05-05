import { Injectable } from "@angular/core";
import { JwtPayload } from "../_models/JwtPayload.model";

@Injectable()
export class TokenService {

  getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  setToken(token: string): void {
    sessionStorage.setItem("token", token);
  }

  deleteToken(): void {
    sessionStorage.removeItem("token");
  }

  getJwtPayload(token: string): JwtPayload {
    return JSON.parse(atob(token.split(".")[1]))
  }

  getUsernameFromJwt(token: string): string {
    return this.getJwtPayload(token).sub.name;
  }

  checkTokenValidity(): boolean {
    return this.getJwtPayload(sessionStorage.getItem("token")!).exp - new Date().getMilliseconds() /1000 > 0;
  }
}