import { Component, OnDestroy, OnInit } from '@angular/core'
import { faArrowLeft, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngxs/store'
import { VariablesService } from '@app/variables.service'
import { AuthState } from '@app/state'
import { SearchResultDto } from '../../dto/search-result.dto'
import { AlbumDto } from '@app/dto'
import { map, Observable, Subject, takeUntil } from 'rxjs'
import { ListenmarksState, ListenmarksStateModel, AddListemark, SetSearching, UpdateQuery } from '../../state'
import { Router } from '@angular/router'
import { ListenmarkDto } from '../../dto/listenmark.dto'

@Component({
  selector: 'app-listen-mark',
  templateUrl: './listenmarks-search.component.html',
  styleUrls: ['./listenmarks-search.component.scss', '../shared.scss'],
})
export class ListenmarksSearchComponent implements OnInit, OnDestroy {
  readonly backIcon = faArrowLeft
  readonly searchIcon = faMagnifyingGlass
  readonly crossIcon = faXmark

  unsubscribe$!: Subject<void>
  query$!: Observable<string>
  searching$!: Observable<boolean>

  queryControl!: FormControl

  searchFocus = false
  searchResults: SearchResultDto | null = null

  showSearchButton!: boolean

  constructor(
    private http: HttpClient,
    private store: Store,
    private variables: VariablesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init')
    this.showSearchButton = false

    this.unsubscribe$ = new Subject<void>()
    this.queryControl = new FormControl()

    this.query$ = this.unsubscribable(this.store.select(ListenmarksState.selectQuery))
    this.query$.subscribe(q => (this.showSearchButton = !!q))

    this.searching$ = this.unsubscribable(
      this.store.select<ListenmarksStateModel>(ListenmarksState).pipe(map(s => s.searching))
    )

    this.unsubscribable(this.queryControl.valueChanges).subscribe(q => this.store.dispatch(new UpdateQuery(q)))
  }

  ngOnDestroy() {
    this.store.dispatch(new UpdateQuery(''))
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  searchFocusIn() {
    this.searchFocus = true
  }

  searchFocusOut() {
    this.searchFocus = false
  }

  submitSearch(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.key === 'Enter') {
      ;(event.target as HTMLElement).blur()
      this.search()
    } else if (event.code === 'Escape' || event.key === 'Escape') {
      ;(event.target as HTMLElement).blur()
    }
  }

  clearSearch() {
    this.queryControl.setValue('')
  }

  selectAlbum(selectAlbum: AlbumDto) {
    this.http.post<ListenmarkDto>(
      this.variables.backendUrl + '/api/v1/listenmarks/add',
      {
        id: selectAlbum.id,
        name: selectAlbum.name,
        imageUri: selectAlbum.images[0].url,
        artists: selectAlbum.artists.map(a => a.name),
      },
      { headers: { Authorization: 'Bearer ' + this.store.selectSnapshot(AuthState).accessToken } }
    ).subscribe(response => {
      this.store.dispatch(new AddListemark(response))
      this.router.navigate(['/', 'listenmarks'])
    })
  }

  search() {
    this.store.dispatch(new SetSearching(true))

    this.showSearchButton = false
    const accessToken = this.store.selectSnapshot(AuthState.all).accessToken
    const url = `${this.variables.backendUrl}/api/v1/listenmarks/search`
    this.http
      .post<SearchResultDto>(
        url,
        {
          query: this.queryControl.value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .subscribe(response => {
        this.searchResults = response
        this.store.dispatch(new SetSearching(false))
        console.log(this.searchResults)
      })
  }

  private unsubscribable<T>(obj: Observable<T> | Subject<T>): Observable<T> | Subject<T> {
    return obj.pipe(takeUntil(this.unsubscribe$))
  }
}
