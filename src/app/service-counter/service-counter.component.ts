import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CounterState } from '../+state/counter/reducers/counter.reducer';
import { CounterService } from '../services/counter.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-service-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './service-counter.component.html',
  styleUrl: './service-counter.component.scss'
})
export class ServiceCounterComponent {
  public count$: Observable<CounterState>;

  constructor(private counterService: CounterService) {
    this.count$ = this.counterService.getCount();
  }

  public increment(): void {
    this.counterService.increment();
  }

  public decrement(): void {
    this.counterService.decrement();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.counterService.reset(count);
    }
  }
}
