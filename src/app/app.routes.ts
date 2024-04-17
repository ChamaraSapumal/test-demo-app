import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { AllBooksComponent } from './page/all-books/all-books.component';
import { RegisterComponent } from './page/register/register.component';
import { AllReadersComponent } from './page/all-readers/all-readers.component';
import { HomeComponent } from './page/home/home.component';
import { AddBookComponent } from './page/add-book/add-book.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: RegisterComponent
    },
    {
        path: "all-books",
        component: AllBooksComponent
    },
    {
        path: "all-users",
        component: AllReadersComponent
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "add-book",
        component: AddBookComponent
    }
];
