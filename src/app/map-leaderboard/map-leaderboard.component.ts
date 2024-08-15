import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Input as RouterInput} from '@angular/core'
import {CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {ClimbMap} from "../data/ClimbMap"
import {ClimbMapRun} from "../data/ClimbMapRun";
import {ClimbUser} from "../data/ClimbUser";
import {ActivatedRoute} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule, MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MAT_SORT_DEFAULT_OPTIONS, MatSort, MatSortDefaultOptions, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {StringUtils} from "../utils/StringUtils"

@Component({
  selector: 'app-map-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule
  ],
  templateUrl: './map-leaderboard.component.html',
  styleUrl: './map-leaderboard.component.scss'
})
export class MapLeaderboardComponent implements AfterViewInit {
  private activatedRoute = inject(ActivatedRoute);
  public mapId: string;
  public runsObservable: Observable<ClimbMapRun[]>;
  public dataSource: MatTableDataSource<ClimbMapRun>;

  displayedColumns: string[] = ['Rank', 'Username', 'Time', 'TPs', 'Date'];

  @ViewChild(MatPaginator,  { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    this.mapId = this.activatedRoute.snapshot.params['mapId'];
    this.runsObservable = this.http.get<ClimbMapRun[]>('https://climb.tf/v1/maps/' + this.mapId + '/runs?class_idx=0');
    this.dataSource = new MatTableDataSource<ClimbMapRun>();

    this.runsObservable.subscribe(runs => {
      this.dataSource = new MatTableDataSource(runs);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: ClimbMapRun, filter: string) => {
        return data.user.username.toLowerCase().indexOf(filter) >= 0;
      };
    });
  }

  ngOnInit(): void {
    console.log("on init");
    this.dataSource.filterPredicate = (data: ClimbMapRun, filter: string) => {
      return data.user.username.toLowerCase().indexOf(filter) >= 0;
    };
  }

  ngAfterViewInit() {
    console.log("viewInit");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatTime(run: ClimbMapRun): string {
    return StringUtils.toTimestamp(run.runTime);
  }

  formatDate(run: ClimbMapRun): string {
    return StringUtils.getTimeAgo(run.date);
  }

}
