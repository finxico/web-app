import { Component, OnInit } from '@angular/core';
import { DescopeAuthenticationService } from './descope-authentication.service';
import { Router } from '@angular/router';

@Component({ template: '' })
export class AuthCallbackComponent implements OnInit {
  constructor(
    private descopeAuth: DescopeAuthenticationService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.descopeAuth.handleAuthCallback();
      this.router.navigate(['/home']);
    } catch (err) {
      alert(err);
      this.router.navigate(['/login']);
    }
  }
}
