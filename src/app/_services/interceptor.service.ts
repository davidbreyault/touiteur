import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {"Content-Type": "application/x-www-form-urlencoded"};
    let interceptedReq = req.clone({ setHeaders: headers });
    return next.handle(interceptedReq);
  }
}