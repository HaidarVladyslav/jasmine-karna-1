import { counterReducer } from "./counter.reducer";

describe('counterReducer', () => {
  it('returns an initial state', () => {
    const newState = counterReducer(undefined, { type: 'init' });
    expect(newState).toBe(0);
  });
});