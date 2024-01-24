import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { ServiceCounterComponent } from "./service-counter/service-counter.component";
import { NgrxCounterComponent } from "./ngrx-counter/ngrx-counter.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CounterComponent, ServiceCounterComponent, NgrxCounterComponent]
})
export class AppComponent {
  title = 'angular-testing-2';
  counter = 2;
}
