import { Routes } from '@angular/router';
import { MapsComponent } from './maps/maps.component';
import { MapLeaderboardComponent } from './map-leaderboard/map-leaderboard.component';
import { HomeComponent } from './home/home.component';
import { JumpstatsComponent } from './jumpstats/jumpstats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'jumpstats', component: JumpstatsComponent },
  { path: 'maps/:mapId', component: MapLeaderboardComponent },
];
