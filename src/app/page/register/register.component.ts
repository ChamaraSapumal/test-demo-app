import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private http;
  public countryList: any;
  public selectedCountry: any;
  public selectedCountryCode: any;
  public userObj = {
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    address: null,
    address2: null,
    country: null,
    contactNumber: null
  }
  public isExistsUser: any;

  constructor(private httpClient: HttpClient, public router: Router) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    let api = "https://restcountries.com/v3.1/all"
    this.http.get(api)
      .subscribe(response => {
        this.countryList = response;
        console.log(response);

      })
  }

  setSelectedCountry(country: any) {
    this.selectedCountry = country;
    this.selectedCountryCode = country.idd.root + country.idd.suffixes[0];
    console.log(this.selectedCountry);

  }

  submitForm() {
    let apiUrl = "http://localhost:8081/reader/isExist/" + this.userObj.userName;

    console.log(this.userObj);
    this.http.get(apiUrl).subscribe(data => {
      console.log(data);
      this.isExistsUser = data;
      this.registerUser(this.isExistsUser);
    })
  }

  registerUser(isExistsUser: any) {
    if (!isExistsUser == true) {
      this.http.post("http://localhost:8081/reader/add-reader", this.userObj)
        .subscribe(data => {
          Swal.fire({
            title: "Good job!",
            text: "Registration Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/login']);
        })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Can not register ${this.userObj?.firstName}!`,
        footer: `username already has been taken`

      });
    }
  }
}
