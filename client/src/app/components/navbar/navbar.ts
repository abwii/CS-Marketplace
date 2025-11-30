import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
