// src/app/book-details/book-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import { Book } from './book.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
   let v =  this.route.queryParamMap;

   console.log(v)
    this.bookService.getData().subscribe((item: Book | Book[]) => {
      const bookId: number = this.bookService.setId();

      console.log(bookId)

      this.fetchBookDetails(bookId);
    });
  }

  private fetchBookDetails(bookId: number): void {
    this.http.get<Book[]>('assets/book.json').subscribe(data => {
      this.book = data.find(book => book.id === bookId);

      if (!this.book) {
        console.error('Book not found.');
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['/book-list']);
  }
}
