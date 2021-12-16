import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authentication: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authentication.cuurenteUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + currentUser.token,
        },
      });
    }
    return next.handle(request);
  }
}
