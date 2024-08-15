import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {ClimbMap} from "../data/ClimbMap"
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {Router} from "@angular/router";
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatDividerModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {
  public maps: Observable<ClimbMap[]>;

  constructor(private http: HttpClient, private router: Router) {
    this.maps = this.http.get<ClimbMap[]>('https://climb.tf/v1/maps');
  }

  ngOnInit(): void {
  }

  visitMap(map: String): void {
    this.router.navigate(['maps/', map])
  }
}
