import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { MusicsComponent } from './musics/musics.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MessagesComponent } from './messages/messages.component';

import { MusicSearchComponent } from './music-search/music-search.component';



@NgModule({
  declarations: [
    AppComponent,
    MusicsComponent,
    MusicDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MusicSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
