import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Music } from './music';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const musics = [
      { id: 12, name: 'Sweater Weather' },
      { id: 13, name: 'Sparks' },
      { id: 14, name: 'Paradise' },
      { id: 15, name: 'First Class' },
      { id: 16, name: 'Wait For U' },
      { id: 17, name: 'Heat Waves' }
    ];
    return {musics};
  }

  genId(musics: Music[]): number {
    return musics.length > 0 ? Math.max(...musics.map(music => music.id)) + 1 : 11;
  }
}