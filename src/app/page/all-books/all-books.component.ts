import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../../common/navbar/navbar.component";

@Component({
  selector: 'app-all-books',
  standalone: true,
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
  imports: [HttpClientModule, FormsModule, CommonModule, NavbarComponent]
})
export class AllBooksComponent implements OnInit {
  public http;
  public bookList: any;
  public selectedBook: any = {};

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks() {
    this.http.get("http://localhost:8080/book/get-book")
      .subscribe((data) => {
        this.bookList = data
        console.log(data)
      })
  }

  public removeBook() {

    let apiUrl = "http://localhost:8080/book/drop-book/" + this.selectedBook.id;

    this.http.delete(apiUrl)
      .subscribe(data => {
        this.loadBooks();
        Swal.fire({
          title: "Successful!",
          text: `${this.selectedBook.title} is deleted!`,
          icon: "success"
        });
        this.selectedBook = null;
      })
  }

  setSelectedBook(book: any) {
    this.selectedBook = book;
  }

  createBook() {
    this.http.post("http://localhost:8080/book/add-book", this.selectedBook)
      .subscribe(data => {
        console.log(data);
        this.selectedBook = {};
        this.loadBooks();
      })
  }


}
