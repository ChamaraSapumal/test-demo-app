import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxTypedJsModule } from 'ngx-typed-js';
import Swal from 'sweetalert2';
import AOS from 'aos';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, CommonModule, NgxTypedJsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginObj: any = {}

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    AOS.init();
  }

  login() {
    this.http.post("http://localhost:8081/login/req", this.loginObj)
      .subscribe((data: any) => {
        console.log(data);
        this.loginObj = {};

        if (data == true) {
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
  }


}
