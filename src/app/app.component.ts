import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import Todo from './model/Todo';
import * as TodoActions from './store/actions/todo';
import { TodoCheckAll } from './store/actions/todo';

interface TodoState {
  items: Array<Todo>;
}

enum ListMode {
  All = 1,
  Completed,
  Active
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  mode: ListMode;
  items: Array<Todo>;
  allItems: Array<Todo>;
  inputValue = '';

  constructor(private store: Store<TodoState>) {
    this.mode = ListMode.All;

    this.store.select('items').subscribe((items) => {
      this.allItems = items;
      switch (this.mode) {
        case ListMode.All:
          this.switchToAll();
          break;
        case ListMode.Active:
          this.switchToActive();
          break;
        case ListMode.Completed:
          this.switchToCompleted();
          break;
      }
    });
  }

  private save() {
    this.store.select('items').subscribe((items) => {
      localStorage.setItem('items', JSON.stringify(items));
    });
  }

  private switchToAll() {
    this.mode = ListMode.All;
    this.items = this.allItems;
  }

  private switchToCompleted() {
    this.mode = ListMode.Completed;
    this.items = this.allItems.filter((item) => item.completed);
  }

  private switchToActive() {
    this.mode = ListMode.Active;
    this.items = this.allItems.filter((item) => !item.completed);
  }

  onSubmit(event) {
      if (this.inputValue.length) {
        this.store.dispatch({type: TodoActions.ADD, payload: this.inputValue});
        this.inputValue = '';
      }
      this.save();
      event.preventDefault();
  }

  onTypeChanged(type) {
    switch (type.value) {
      case 'all':
        this.switchToAll();
        break;
      case 'active':
        this.switchToActive();
        break;
      case 'completed':
        this.switchToCompleted();
        break;
    }
  }

  onCompletedChange(event, id) {
    if (event.checked) {
      this.store.dispatch({type: TodoActions.COMPLETE, payload: id});
    } else {
      this.store.dispatch({type: TodoActions.UNCOMPLETE, payload: id});
    }
    this.save();
  }

  onCheckAll(event) {
    this.store.dispatch({type: TodoActions.CHECKALL, payload: event.checked});
    this.save();
  }

}
