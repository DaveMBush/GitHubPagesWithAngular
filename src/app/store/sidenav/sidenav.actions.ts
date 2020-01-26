import { createAction, props, union } from '@ngrx/store';
import { NavItemInterface } from 'src/app/index/nav-tree/nav-item.interface';

export const get = createAction(
  '[SideNav] Get'
);

export const getResult = createAction(
  '[SideNav] GetResult',
  props<{ sideNav: Array<NavItemInterface> }>()
);

const actions = union({
  get,
  getResult
});

export type Actions = typeof actions;
