import { Injectable } from '@angular/core';
import { Music } from './music';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private musicsUrl = 'api/musics';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  
    private http: HttpClient,
    private messageService: MessageService) { }

  getMusics(): Observable<Music[]> {
    return this.http.get<Music[]>(this.musicsUrl)
    .pipe(
      tap(_ => this.log('fetched musics')),
      catchError(this.handleError<Music[]>('getMusics', []))
    );
  }
  getMusicNo404<Data>(id: number): Observable<Music> {
    const url = `${this.musicsUrl}/?id=${id}`;
    return this.http.get<Music[]>(url)
      .pipe(
        map(musics => musics[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} music id=${id}`);
        }),
        catchError(this.handleError<Music>(`getMusic id=${id}`))
      );
  }

    /** GET music by id. Will 404 if id not found */
  getMusic(id: number): Observable<Music> {
    const url = `${this.musicsUrl}/${id}`;
    return this.http.get<Music>(url).pipe(
      tap(_ => this.log(`fetched music id=${id}`)),
      catchError(this.handleError<Music>(`getMusic id=${id}`))
    );
  } 

  updateMusic(music: Music): Observable<any> {
    return this.http.put(this.musicsUrl, music, this.httpOptions).pipe(
      tap(_ => this.log(`updated music id=${music.id}`)),
      catchError(this.handleError<any>('updateMusic'))
    );
  }

  addMusic(music: Music): Observable<Music> {
    return this.http.post<Music>(this.musicsUrl, music, this.httpOptions).pipe(
      tap((newMusic: Music) => this.log(`added music w/ id=${newMusic.id}`)),
      catchError(this.handleError<Music>('addMusic'))
    );
  }
  deleteMusic(id: number): Observable<Music> {
    const url = `${this.musicsUrl}/${id}`;
  
    return this.http.delete<Music>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted music id=${id}`)),
      catchError(this.handleError<Music>('deleteMusic'))
    );
  }
    /* GET musics whose name contains search term */
  searchMusics(term: string): Observable<Music[]> {
    if (!term.trim()) {
      // if not search term, return empty music array.
      return of([]);
    }
    return this.http.get<Music[]>(`${this.musicsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found musics matching "${term}"`) :
        this.log(`no musics matching "${term}"`)),
      catchError(this.handleError<Music[]>('searchMusics', []))
    );
  }
 
 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MusicService: ${message}`);
  }
}
