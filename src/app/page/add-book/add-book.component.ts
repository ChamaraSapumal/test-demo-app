import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  constructor(private http: HttpClient) {
  }

  public bookObj: any = {
    isbn: "",
    title: "",
    authorName: "",
    category: "",
    qty: ""
  }

  public selectedItems: any = 0;

  public isCheckedIsbn: boolean = false;
  public isCheckedTitle: boolean = false;
  public isCheckedAuthor: boolean = false;
  public isCheckedCategory: boolean = false;
  public isCheckedQty: boolean = false;
  public isVerified: boolean = false;

  checkSelectedItems() {
    this.selectedItems =
      (this.isCheckedIsbn ? 1 : 0) +
      (this.isCheckedTitle ? 1 : 0) +
      (this.isCheckedAuthor ? 1 : 0) +
      (this.isCheckedCategory ? 1 : 0) +
      (this.isCheckedQty ? 1 : 0)
  }

  addBook() {
    console.log(this.bookObj);
    this.http.post("http://localhost:8080/book/add-book", this.bookObj)
      .subscribe(data => {
        Swal.fire({
          title: "Successful!",
          text: `${this.bookObj.title} is added!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }

  verifyInformation() {
    this.isVerified = true;
  }


  registerButtonDisable(): boolean {
    return !this.isVerified || this.selectedItems !== 5;
  }

}
