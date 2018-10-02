import { Action } from '@ngrx/store';

export const LOAD  = '[Todo] Load';
export const ADD  = '[Todo] Add';
export const COMPLETE   = '[Todo] Complete';
export const UNCOMPLETE = '[Todo] Uncomplete';
export const CHECKALL   = '[Todo] Check All';


export class TodoLoad implements Action {
  readonly type = LOAD;
  constructor(public payload: string) {}
}

export class TodoAdd implements Action {
  readonly type = ADD;
  constructor(public payload: string) {}
}

export class TodoCheckAll implements Action {
  readonly type = CHECKALL;
  constructor(public payload: number) {}
}

export class TodoComplete implements Action {
  readonly type = COMPLETE;
  constructor(public payload: number) {}
}

export class TodoUncomplete implements Action {
  readonly type = UNCOMPLETE;
  constructor(public payload: number) {}
}



export type All
  = TodoAdd
  | TodoLoad
  | TodoCheckAll
  | TodoComplete
  | TodoUncomplete;
