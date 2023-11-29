import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookResolver } from './book.resolver';
import { BookDetailsComponent } from './book-details/book-details.component';


const routes: Routes = [
  {
    path: 'book-list',
    component: BookListComponent,
    resolve: { books: BookResolver }
  },
  { path: 'book-details/:id', component: BookDetailsComponent },
  // { path: 'book-search', component: BookSearchComponent },
  { path: '', redirectTo: '/book-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
