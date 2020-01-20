import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { get, getResult } from './sidenav.actions';
import { DocumentService } from 'src/app/document.service';
import { switchMap, map } from 'rxjs/operators';
import { NavItemInterface } from 'src/app/index/nav-tree/nav-item.interface';



@Injectable()
export class SideNavEffects {



  constructor(
    private actions$: Actions,
    private docService: DocumentService
  ) { }

  getContent: Actions = createEffect(
    () => this.actions$.pipe(
      ofType(get),
      switchMap(() =>
        this.docService.getSideNav()
      ),
      map((result: Array<NavItemInterface>) => getResult({ sideNav: result }))
    )
  );

}
