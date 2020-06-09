import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";

// enums
import { ResponseStatus } from "../config/request-status";

// services
import { ErrService } from "../app/shared/components/err/err.service";
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public userService: UserService,
        public errService: ErrService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(retry(1),
                tap(event => {
                    if (event instanceof HttpResponse) {
                        const res = event.body
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log("Error catched: ", error)
                    let errorMessage: string;

                    if (error.status === ResponseStatus.connectionError) {
                        errorMessage = "Connection error, please check and try again";
                        this.errService.changeMessage(errorMessage);
                    }
                    else if (error.status === ResponseStatus.fail) {
                        // api is not found
                        errorMessage = "Some thing went wrong, please check and try again";
                        this.errService.changeMessage(errorMessage);
                    }
                    else if (error.status === ResponseStatus.invalidInput) {
                        // handle validation error
                        console.log(error)
                        this.errService.changeMessage(error.error);
                    }
                    else if (error.status !== ResponseStatus.success) {
                        errorMessage = "An error occurred please try again in few minutes.For further help please contact our customer support.";
                        this.errService.changeMessage(errorMessage);
                    }
                    else {
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                            this.errService.changeMessage(errorMessage);
                        } else {
                            // server-side error
                            errorMessage = "An error occurred please try again in few minutes.For further help please contact our customer support.";
                            this.errService.changeMessage(errorMessage);
                        }
                    }

                    return throwError(error);
                }
                ));
    }
}