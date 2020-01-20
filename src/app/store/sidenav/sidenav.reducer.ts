import { createReducer, on } from '@ngrx/store';
import { getResult } from './sidenav.actions';


export const sideNavReducer = createReducer(
  [],
  on(getResult, (state, { sideNav }) => sideNav)
);
