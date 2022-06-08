import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  musics: Music[] = [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.getMusics();
  }

  getMusics(): void {
    this.musicService.getMusics()
      .subscribe(musics => this.musics = musics.slice(1, 5));
  }

}
