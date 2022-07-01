import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faArrowLeft, faCross, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngxs/store";
import {VariablesService} from "../../../variables.service";
import {AuthState} from "../../../state";
import {SearchResultDto} from '../../dto/search-result.dto';
import {AlbumDto} from '../../../dto';
import {Observable} from 'rxjs';
import {ListenmarksState, ListenmarksStateModel} from '../../state';

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
  searchResults: SearchResultDto | null = null

  key = ""

  showSearchButton = false;
  searching = false;

  canSendQuery = false;

  state$: Observable<ListenmarksStateModel>

  constructor(
    private http: HttpClient,
    private store: Store,
    private variables: VariablesService
  ) {
    this.state$ = store.select(ListenmarksState)
    this.state$.subscribe(state => {

    })
  }

  ngOnInit(): void {
    this.query.valueChanges.subscribe(v => this.showSearchButton = v)
  }

  searchFocusIn() {
    if (this.query.value && !this.showSearchButton)
      this.showSearchButton = true
    this.searchFocus = true
  }

  searchFocusOut() {
    this.searchFocus = false
  }

  submitSearch(event: KeyboardEvent) {
    if (event.code === "Enter" || event.key === "Enter") {
      (event.target as HTMLElement).blur();
      this.search()
    } else if (event.code === "Escape" || event.key === "Escape") {
      (event.target as HTMLElement).blur();
    }
  }

  clearSearch() {
    this.query.setValue(null);
  }

  selectAlbum(selectAlbum: AlbumDto) {

  }

  search() {
    this.showSearchButton = false
    this.searching = true;
    const accessToken = this.store.selectSnapshot(AuthState.all).accessToken
    const url = `${this.variables.backendUrl}/api/v1/listenmarks/search`
    this.http.post<SearchResultDto>(url, {
      query: this.query.value
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).subscribe(response => {
      this.searchResults = response;
      this.searching = false;
      console.log(this.searchResults)
    })
  }
}
