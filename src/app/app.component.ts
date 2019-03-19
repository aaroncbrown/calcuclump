import { Component } from '@angular/core';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { slideInAnimation } from './rename-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ slideInAnimation ]
})
export class AppComponent {

  sidebarHidden: boolean;
  faArrowLeft = faArrowLeft;
  faBars = faBars;

  constructor() {
    this.sidebarHidden = false;
  }

  closeSideBar() {
    this.sidebarHidden = true;
  }

  openSideBar() {
    this.sidebarHidden = false;
  }
}
