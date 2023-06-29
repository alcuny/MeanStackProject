import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Add this import statement
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {}


  onLogoutClick(){
    this.authService.logout();
    this.toastr.show('You are logged out!');
    this.router.navigate(['/login']);
    return false;

  }
}
