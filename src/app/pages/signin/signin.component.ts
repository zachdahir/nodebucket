/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 9-26-20
 * Description: signin component
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  //login function to get employee and route to home
  login(){
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res => {
      if (res) {
        this.cookieService.set('session_user', empId);//set id to session_user
         this.router.navigate(['/']);
      } else {
        this.router.navigate(['/session/sign']);

        this.error = "The employee Id entered is invalid";
      }
    })
  }
}
