import { Component, OnInit } from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-listenmark-list',
  templateUrl: './listenmarks-list.component.html',
  styleUrls: ['./listenmarks-list.component.scss', '../shared.scss']
})
export class ListenmarksListComponent implements OnInit {
  backIcon = faArrowLeft

  constructor() { }

  ngOnInit(): void {
  }

}
