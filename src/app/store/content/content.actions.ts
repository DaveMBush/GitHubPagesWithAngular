import { createAction, props, union } from '@ngrx/store';

export const get = createAction(
  '[Content] Get',
  props<{ url: string }>()
);

export const getResult = createAction(
  '[Content] GetResult',
  props<{ content: string }>()
);

const actions = union({
  get,
  getResult
});

export type Actions = typeof actions;
