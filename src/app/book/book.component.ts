import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  books = [];
  model = new Book();
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getAllBooks();
    this.books.length;
    // this.model.id=20;
  }
  public getAllBooks() {
    this.bookService.getAllBookService().subscribe((data: any[]) => {
      this.books = data;
    });
  }
  addUser() 
  {
    if (!this.model.id){
    this.bookService.createBookService(this.model).subscribe((data) => {
      this.getAllBooks();
      this.model = new Book();
    });}
    else{
      this.bookService.updateBookService(this.model.id,this.model).subscribe((data) => {
        this.getAllBooks();
        this.model = new Book();
    });
  }}
  removeBook(id)
  {

      this.bookService.deleteBookService(id).subscribe((data) => {
        this.getAllBooks();
      });
  }


  editBook(id) {
    this.bookService
      .getBookService(id)
      .subscribe((data : any) => (this.model = data));
  }
}
