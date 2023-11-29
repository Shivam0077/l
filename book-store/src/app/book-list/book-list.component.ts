// src/app/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,private bookService: BookService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.books = data.books;
      console.log(this.books)
    });
  }

  viewDetails(bookId: number): void {
    this.router.navigate(['/book-details', bookId]);
    this.bookService.getId(bookId);
    console.log(bookId)
  }
}
