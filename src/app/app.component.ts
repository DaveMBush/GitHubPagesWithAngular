import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavItemInterface } from './nav-tree/nav-item.interface';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GitHubPagesAngular';
}
