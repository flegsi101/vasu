import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private store: Store) {
    window.onbeforeunload = () => {
      localStorage.setItem('urlBeforeReload', router.url);
    };
  }

  ngOnInit(): void {

  }
}
