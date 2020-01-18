import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { NavItemInterface } from '../nav-tree/nav-item.interface';
import { DocumentService } from '../document.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit{

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
    private router: Router
  ) {
    router.events
      .pipe(
        filter((event: NavigationEnd) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const url: string = this.router.routerState.snapshot.url;
        this.content = this.documentService.getPage(url);
      });
  }
  ngOnInit(): void {
    this.sideNav = this.documentService.getSideNav();
    this.sideNav.subscribe(x => {
      this.router.navigate([x[0].location]);
    });
  }

}
