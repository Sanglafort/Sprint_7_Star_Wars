import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public isLogedIn!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogedIn.subscribe((logedStatus: boolean) => {
      this.isLogedIn = logedStatus;
    })
  }

  logout() {
    this.authService.logout()
  }



}
