import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCounterComponent } from './ngrx-counter.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../shared/app-state';
import { Store } from '@ngrx/store';
import { click, expectText, setFieldValue } from '../spec-helpers/element.spec-helper';
import { decrement, increment, reset } from '../+state/counter/actions/counter.actions';

const initialState: AppState = { counter: 0 };

const newCount = 15;

describe('NgrxCounterComponent', () => {
  let component: NgrxCounterComponent;
  let fixture: ComponentFixture<NgrxCounterComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxCounterComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(NgrxCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(initialState.counter));
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    expect(store.dispatch).toHaveBeenCalledWith(reset({ count: newCount }));
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
