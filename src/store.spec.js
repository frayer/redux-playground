import { createStore } from 'redux';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';

/**
 * Demonstrating different ways of composing reducers
 */
// import { todoApp as reducers } from './reducers.1';
// import { todoApp as reducers } from './reducers.2';
import { todoApp as reducers } from './reducers.3';

let store;

describe('redux store behavior', () => {
  beforeEach(() => {
    store = createStore(reducers);
  });

  it('has a default visibility filter', () => {
    expect(store.getState().visibilityFilter).to.equal(VisibilityFilters.SHOW_ALL);
  })

  it('has zero todos as a default', () => {
    expect(store.getState().todos).to.have.lengthOf(0);
  });

  it('changes the visibility filter when the approriate action is dispatched', () => {
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE));

    expect(store.getState().visibilityFilter).to.equal(VisibilityFilters.SHOW_ACTIVE);
  });

  it('adds todos with each dispatched action', () => {
    store.dispatch(addTodo('Todo 1'));
    store.dispatch(addTodo('Todo 2'));

    expect(store.getState().todos).to.have.lengthOf(2);
  });

  it('toggles a todo with the appropriate action is dispatched', () => {
    store.dispatch(addTodo('Todo 1'));
    store.dispatch(addTodo('Todo 2'));

    store.dispatch(toggleTodo(1));

    expect(store.getState().todos[0].completed).to.be.false;
    expect(store.getState().todos[1].completed).to.be.true;
  });
});
