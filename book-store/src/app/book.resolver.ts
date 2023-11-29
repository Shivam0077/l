import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<any[]> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<any[]> {
    return this.http.get<any[]>('assets/book.json').pipe(
      catchError((error: any) => {
        console.error('Error loading books:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
}
