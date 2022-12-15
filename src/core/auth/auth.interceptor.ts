import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/no-auth/authentication/authentication.service';

// import { AuthenticationService } from '@app/_services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const token = localStorage.getItem('token');
        console.log(token);
        
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: token
                }
            });
        }

        return next.handle(request);
    }
}