import { Action, createReducer, on } from '@ngrx/store';
import { getResult } from './content.actions';


export const contentFeatureKey = 'content';

export const contentReducer = createReducer(
  '',
  on(getResult, (state, { content }) => content)
);
