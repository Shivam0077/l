import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from './book-details/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  id!: number;
  apiUrl = 'assets/book.json'

  constructor(private http: HttpClient) { }

  getData(){
  return this.http.get<any[]>(this.apiUrl).pipe(
    catchError((error: any) => {
      console.error('Error loading books:', error);
      return of([]); // Return an empty array in case of an error
    })
  );
  }

  getId(id: any){
  this.id = id;
  }

  setId(){
    return this.id;
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map((books: any[]) => books.find((book: { id: number; }) => book.id === id))
    );
  }

  searchBooks(term: string): Observable<Book[]> {
    // Assuming you want to search by title or author
    return this.getBooks().pipe(
      map((books: any[]) => books.filter((book: { title: string; author: string; }) =>
        book.title.toLowerCase().includes(term.toLowerCase()) || 
        book.author.toLowerCase().includes(term.toLowerCase())
      )),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return new Observable<never>();
  }
}
