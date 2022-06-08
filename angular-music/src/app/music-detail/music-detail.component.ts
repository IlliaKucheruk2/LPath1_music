import { Component, OnInit, Input  } from '@angular/core';
import { Music } from '../music';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css']
})
export class MusicDetailComponent implements OnInit {

  music: Music | undefined;
  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMusic();
  }
  getMusic(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.musicService.getMusic(id)
      .subscribe(music => this.music = music);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.music) {
      this.musicService.updateMusic(this.music)
        .subscribe(() => this.goBack());
    }
  }

}
