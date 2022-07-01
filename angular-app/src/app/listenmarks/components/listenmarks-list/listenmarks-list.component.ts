import { Component, OnInit } from '@angular/core'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { map, Observable, Subject, takeUntil } from 'rxjs'
import { Store } from '@ngxs/store'
import {ListenmarksState, RemoveListenmark, SetListenmarks} from '@app/listenmarks/state'
import { HttpClient } from '@angular/common/http'
import { VariablesService } from '@app/variables.service'
import { AuthState } from '@app/state'
import { ListenmarkDto } from '@app/listenmarks/dto/listenmark.dto'

@Component({
  selector: 'app-listenmark-list',
  templateUrl: './listenmarks-list.component.html',
  styleUrls: ['./listenmarks-list.component.scss', '../shared.scss'],
})
export class ListenmarksListComponent implements OnInit {
  readonly backIcon = faArrowLeft
  readonly trash = faTrash

  unsubscribe$!: Subject<void>
  listemarks$!: Observable<ListenmarkDto[]>

  constructor(private store: Store, private http: HttpClient, private vars: VariablesService) {}

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>()

    this.listemarks$ = this.unsubscribable(this.store.select(ListenmarksState.full)).pipe(map(s => s.listenmarks))

    this.http
      .get<ListenmarkDto[]>(`${this.vars.backendUrl}/api/v1/listenmarks`, {
        headers: {
          Authorization: 'Bearer ' + this.store.selectSnapshot(AuthState.all).accessToken,
        },
      })
      .subscribe(response => {
        this.store.dispatch(new SetListenmarks(response))
      })
  }

  delete(event: Event, id: string) {
    console.log(id)
    event.stopPropagation()
    this.http.delete(this.vars.backendUrl + '/api/v1/listenmarks/' + id, {
      headers: { Authorization: 'Bearer ' + this.store.selectSnapshot(AuthState.all).accessToken },
    }).subscribe(res => {
      this.store.dispatch(new RemoveListenmark(id))
    })
  }

  private unsubscribable<T>(obj: Observable<T> | Subject<T>): Observable<T> | Subject<T> {
    return obj.pipe(takeUntil(this.unsubscribe$))
  }
}
