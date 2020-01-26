import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { DocumentService } from 'src/app/document.service';
import { NavItemInterface } from 'src/app/index/nav-tree/nav-item.interface';
import { get, getResult } from './sidenav.actions';



@Injectable()
export class SideNavEffects {



  constructor(
    private readonly actions$: Actions,
    private readonly docService: DocumentService
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
