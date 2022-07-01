import { Component, OnInit } from '@angular/core';
import {faArrowLeft, faCross, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngxs/store";
import {VariablesService} from "../../../variables.service";
import {AuthState} from "../../../state";

@Component({
  selector: 'app-listen-mark',
  templateUrl: './listenmarks-search.component.html',
  styleUrls: ['./listenmarks-search.component.scss', '../shared.scss']
})
export class ListensmarksSearchComponent implements OnInit {
  backIcon = faArrowLeft
  searchIcon = faMagnifyingGlass
  crossIcon = faXmark

  searchFocus = false;
  query = new FormControl()
  searchResults = []

  constructor(
    private http: HttpClient,
    private store: Store,
    private variables: VariablesService
  ) { }

  ngOnInit(): void {

  }

  searchFocusIn() {
    this.searchFocus = true
  }

  searchFocusOut() {
    this.searchFocus = false
  }

  submitSearch(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.search()
    } else if (event.code === "Escape") {
      (event.target as HTMLElement).blur();
    }
  }

  clearSearch() {
    this.query.setValue(null);
  }

  selectResult(album: any) {

  }

  private search() {
    const accessToken = this.store.selectSnapshot(AuthState.all).accessToken
    const url = `${this.variables.backendUrl}/api/v1/listenmarks/search`
    this.http.post<any>(url, {
      query: this.query.value
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).subscribe(response => {
      this.searchResults = response.items;
      console.log(this.searchResults)
    })
  }
}
