import { Action } from '@ngrx/store';
import * as TodoActions from '../actions/todo';
import Todo from '../../model/Todo';

const defaultState: Array<Todo> = [];
let currentID = 0;

export function getInitialState() {
  let items = [];
  try {
    items = JSON.parse(localStorage.getItem('items'));
  } catch (e) {}
  return {
    items: items
  };
}

export function todoReducer(state: Array<Todo> = defaultState, action: TodoActions.All) {
  const payload: any = action.payload;
  switch (action.type) {

    case TodoActions.ADD:
      state.push({
        id: currentID++,
        completed: false,
        name: payload
      });
      return state;

    case TodoActions.LOAD:
      return Array.isArray(payload) ? payload : [] ;

    case TodoActions.COMPLETE:
      return state.map((item) => {
        if (item.id === payload) {
          item.completed = true;
        }
        return item;
      });

    case TodoActions.UNCOMPLETE:
      return state.map((item) => {
        if (item.id === payload) {
          item.completed = false;
        }
        return item;
      });

    case TodoActions.CHECKALL:
      return state.map((item) => {
        item.completed = !!payload;
        return item;
      });

    default:
      return state;
  }

}
