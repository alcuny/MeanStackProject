import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Add this import statement

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  onLoginSubmit() {
    //console.log(this.username);
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if((data as any).succes) {
        console.log('hej');
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.toastr.success('You are logged in!');
        this.router.navigate(['dashboard']);
        console.log('nej');
      }else {
        console.log('gej');
        this.toastr.error((data as any).msg);
        this.router.navigate(['login']);
      }
      //console.log(data);
    });
  }
}
