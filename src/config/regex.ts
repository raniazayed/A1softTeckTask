
import { Injectable } from '@angular/core';

@Injectable()
export class regex {
    public static regexPattern: any = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,12}$/,
        password: /^.{6,512}$/,
        name: /^[\s\S]{3,80}$/,
    }
}
