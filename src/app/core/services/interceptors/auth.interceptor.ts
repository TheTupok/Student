import {Injectable} from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageUserService} from "../users-local.service";


@Injectable({providedIn: "root"})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storageUserService: StorageUserService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newRequest = request.clone();

    const token = this.storageUserService.getToken()

    if (token) {
      newRequest = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + token
        ),
      });
    }

    return next.handle(newRequest);
  }
}
