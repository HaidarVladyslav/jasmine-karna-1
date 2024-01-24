import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../../../shared/app-state";
import { CounterApiService } from "../../../services/counter-api.service";
import { decrement, increment, reset, saveError, saveSuccess } from "../actions/counter.actions";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private store$: Store<AppState>, private counterApiService: CounterApiService) { }

  public saveOnChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increment, decrement, reset),
      withLatestFrom(this.store$),
      mergeMap(([_, state]) => this.counterApiService.saveCounter(state.counter).pipe(
        map(() => saveSuccess()),
        catchError((error) => of(saveError({ error })))
      ))
    ))
}