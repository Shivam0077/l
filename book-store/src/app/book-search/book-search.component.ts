// src/app/book-search/book-search.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Book } from '../book-details/book.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books$!: Observable<Book[]>;
  private searchTerms = new Subject<string>();
  searchTerm: string = '';
  book: Book | undefined;

  constructor(private bookService: BookService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.trim() !== ''),
      switchMap((term: string) => this.bookService.searchBooks(term))
    );
  }

  search(event: any): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchTerm = event.target.value;
      this.searchTerms.next(this.searchTerm);
    }
  }

 

  goToDetails(bookId: number): void {
    this.fetchBookDetails(bookId);
    this.router.navigate(['/book-details', bookId]);
  }

  fetchBookDetails(bookId: number): void {
    this.http.get<Book[]>('assets/book.json').subscribe(data => {
      this.book = data.find(book => book.id === bookId);

      if (!this.book) {
        console.error('Book not found.');
        // Handle error or navigate to an error page
      }
    });
  }
}
