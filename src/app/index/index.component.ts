import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { NavItemInterface } from './nav-tree/nav-item.interface';
import { DocumentService } from '../document.service';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { get } from '../store/content/content.actions';
import { get as getSideNav } from '../store/sidenav/sidenav.actions';
import { State } from '../store';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  sideNav: Observable<ReadonlyArray<NavItemInterface>>;
  content: Observable<string>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private documentService: DocumentService,
    private router: Router,
    private store: Store<State>
  ) {
    this.store.dispatch(getSideNav());
    router.events
      .pipe(
        filter((event: NavigationEnd) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const url: string = this.router.routerState.snapshot.url;
        if (url.length === 0) {
          this.sideNav
            .pipe(
              filter((x: Array<NavItemInterface>) => x.length > 0)
            )
            .subscribe(x => {
              this.router.navigate([x[0].location]);
            });
        }
        this.store.dispatch(get({ url }));
      });
  }
  ngOnInit(): void {
    this.content = this.store.select((s: State) => s.content);
    this.sideNav = this.store.select((s: State) => s.sideNav);
  }

}
