import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .isSignedIn()
      .then((user) => {})
      .catch((error) => {
        this.router.navigateByUrl('/login');
      });

    const userrdata = this.authService.getUser();
    if (userrdata) {
      this.authService.getUserAccount(userrdata.uid).subscribe((data) => {
        if (!data) return;
        this.user = data;
      });
    }
  }

  logOut() {
    this.authService.signOut();
  }
}
