import { Component, OnInit, HostListener, Input, ElementRef, SimpleChanges, Inject, PLATFORM_ID } from "@angular/core";

// services
import { ErrService } from "./err.service";

@Component({
    selector: "app-err",
    templateUrl: "./err.component.html",
})

export class ErrComponent implements OnInit {

    @Input("err") err;
    msg: string;

    constructor(
        private eRef: ElementRef,
        public errService: ErrService,
        @Inject(PLATFORM_ID) private platformId: Object) {
        this.errService.currentMessage.subscribe((msg: string) => {
            this.msg = msg;
        });
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.err.currentValue && changes.err.currentValue.msg) {
            setTimeout(function () {
                window.scrollTo(0, 1800);
            }, 500);
        }
    }

    @HostListener("document:click", ["$event"])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target) && this.msg) {
            this.msg = "";
        }
    }

}
