import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {}

    if (req.url.indexOf("/send") != -1) {
      headers = { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + this.authenticationService.getAuthenticationData().bearerToken!
      };
    } else {
      headers = {"Content-Type": "application/x-www-form-urlencoded"}
    }

    let interceptedReq = req.clone({ setHeaders: headers });
    return next.handle(interceptedReq);
  }
}