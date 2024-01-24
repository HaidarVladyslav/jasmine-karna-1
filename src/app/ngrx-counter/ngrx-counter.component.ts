import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterState } from '../+state/counter/reducers/counter.reducer';
import { Store, select } from '@ngrx/store';
import { AppState } from '../shared/app-state';
import { selectCounter } from '../shared/selectors';
import { decrement, increment, reset } from '../+state/counter/actions/counter.actions';

@Component({
  selector: 'app-ngrx-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './ngrx-counter.component.html',
  styleUrl: './ngrx-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxCounterComponent {
  public count$: Observable<CounterState>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select(selectCounter));
  }

  public increment(): void {
    this.store.dispatch(increment());
  }

  public decrement(): void {
    this.store.dispatch(decrement());
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.store.dispatch(reset({ count }));
    }
  }
}
