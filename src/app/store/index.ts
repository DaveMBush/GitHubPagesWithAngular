import {
  ActionReducerMap,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { NavItemInterface } from '../index/nav-tree/nav-item.interface';
import { contentReducer } from './content/content.reducer';
import { sideNavReducer } from './sidenav/sidenav.reducer';

export interface State {
  content: string;
  sideNav: Array<NavItemInterface>;
}

export const reducers: ActionReducerMap<State> = {
  content: contentReducer,
  sideNav: sideNavReducer
};
