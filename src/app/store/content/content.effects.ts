import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { get, getResult } from './content.actions';
import { DocumentService } from 'src/app/document.service';
import { switchMap, map } from 'rxjs/operators';



@Injectable()
export class ContentEffects {



  constructor(
    private actions$: Actions,
    private docService: DocumentService
  ) {}

  getContent: Actions = createEffect(
    () => this.actions$.pipe(
      ofType(get),
      switchMap(({url}: {url: string}) =>
        this.docService.getPage(url)
      ),
      map((result: string) => getResult({content: result}))
    )
  );

}
