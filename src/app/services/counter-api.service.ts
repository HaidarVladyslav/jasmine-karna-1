import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterApiService {
  private http = inject(HttpClient);
  public saveCounter(counter: number): Observable<{}> {
    return this.http.get(`/assets/counter.json?counter=${counter}`);
  }
}
