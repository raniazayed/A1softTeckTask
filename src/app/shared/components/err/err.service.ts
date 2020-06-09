// angular modules
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ErrService {

    // #region error message

    private msgSource:BehaviorSubject<string> = new BehaviorSubject("");
    currentMessage = this.msgSource.asObservable();
    changeMessage(msg: string) { this.msgSource.next(msg); }

    // #endregion

}