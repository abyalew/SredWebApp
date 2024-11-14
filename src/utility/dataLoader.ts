import { signal, WritableSignal } from "@angular/core";
import { catchError, Observable, take } from "rxjs";

export class DataLoader<T> {
    data: WritableSignal<T | undefined>;
    isLoading = false;
    hasError = false;
    private action$: Observable<T> |undefined;

    constructor(){
        this.data = signal<T | undefined>(undefined)
    }
    load(action$: Observable<T>): void {
        this.isLoading = true;
        this.hasError = false;
        this.action$ = action$;
        this.action$.pipe(
            take(1),
            catchError(() => {
                this.data.set(undefined);
                this.isLoading = false;
                this.hasError = true;
                return [];
            })
        )
        .subscribe((data: T) => {
            this.data?.set(data);
            setTimeout(() => {
                this.isLoading = false;
                this.hasError = false;
            }, 0);
        });
    }
}