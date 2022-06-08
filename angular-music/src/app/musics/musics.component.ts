import { Component, OnInit } from '@angular/core';
import { Music } from '../music';

import { MusicService } from '../music.service';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.css']
})
export class MusicsComponent implements OnInit {

  musics: Music[] = [];
  

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.getMusics();
  }


  getMusics(): void {
    this.musicService.getMusics()
      .subscribe(musics => this.musics = musics);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.musicService.addMusic({ name } as Music)
      .subscribe(music => {
        this.musics.push(music);
      });
  }
  delete(music: Music): void {
    this.musics = this.musics.filter(h => h !== music);
    this.musicService.deleteMusic(music.id).subscribe();
  }
}
