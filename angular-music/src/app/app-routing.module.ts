import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicsComponent } from './musics/musics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MusicDetailComponent },
  { path: 'musics', component: MusicsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }