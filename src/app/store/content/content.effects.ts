import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { DocumentService } from 'src/app/document.service';
import { get, getResult } from './content.actions';



@Injectable()
export class ContentEffects {



  constructor(
    private readonly actions$: Actions,
    private readonly docService: DocumentService
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
