import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-readers',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './all-readers.component.html',
  styleUrl: './all-readers.component.css'
})
export class AllReadersComponent implements OnInit {

  public userList: any;
  private baseURL: String = "http://localhost:8081";
  selectedUser: any = {
    // "id": null,
    // "userName": null,
    // "fistName": null,
    // "lastName": null,
    // "address": null,
    // "address2": null,
    // "country": null,
    // "email": null,
    // "contactNumber": null
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get(this.baseURL + "/reader/get-reader")
      .subscribe((responce: any) => {
        console.log(responce);
        this.userList = responce;
      })
  }

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  removeUser() {
    this.http.delete(this.baseURL + "/reader/drop-reader/" + this.selectedUser.id)
      .subscribe(data => {
        this.loadUsers();
        Swal.fire({
          title: "Successful!",
          text: `${this.selectedUser.userName} is deleted!`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        });
        this.selectedUser = null;
      })
  }

  createUser() {
    this.http.post(this.baseURL + "/reader/add-reader", this.selectedUser)
      .subscribe(data => {
        console.log(data);
        Swal.fire({
          title: "Successful!",
          text: `${this.selectedUser.userName} is updated!`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        });
        this.selectedUser = {}
        this.loadUsers();
      })

  }

}
