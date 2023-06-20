import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr'; // Add this import statement
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService, // Add ToastrService to the constructor
    private authService: AuthService,
    private router: Router
  ) {
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
  }

  ngOnInit() {}

  onRegisterSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // validate registration fields
    if (!this.validateService.validateRegister(user)) {
      this.toastr.error('Please fill in all fields'); // Display error toast message
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.toastr.error('Please enter a valid email'); // Display error toast message
      return false;
    }


    // register user
    this.authService.registerUser(user).subscribe(data => {
      this.authService.registerUser(user).subscribe((data: any) => {
        if (data && data.hasOwnProperty('success') && data.success) {
          this.toastr.success('You are now registered!');
          this.router.navigate(['/login']);
        } else {
          // Handle registration failure
          this.toastr.error('Registration failed. Please try again.');
          this.router.navigate(['/register']);
        }
      });
      
    });

    // Continue with the registration logic
    // ...

    // Display success toast message
    this.toastr.success('Registration successful!', 'Success');

    return true;
  }
}


