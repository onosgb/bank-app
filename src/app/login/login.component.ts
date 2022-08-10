import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;
  message = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin({ email, password }: any) {
    if (!email && password!) return;
    this.loading = !this.loading;

    this.authService.signIn(email, password).catch((err) => {
      this.loading = !this.loading;
      this.message = 'Invalid email and password';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    });
  }

  get rf() {
    return this.loginForm.controls;
  }
}
