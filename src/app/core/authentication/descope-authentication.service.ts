import { Injectable } from '@angular/core';
import DescopeSdk from '@descope/web-js-sdk';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DescopeAuthenticationService {
  private sdk = DescopeSdk({
    projectId: environment.descope.projectId,
    baseUrl: environment.descope.baseUrl,
    oidcConfig: { redirectUri: environment.descope.redirectUri },
    // Habilita persistencia automática de tokens y refresco
    persistTokens: true,
    autoRefresh: true
  });

  constructor(private router: Router) {}

  /** Inicia el flujo OIDC/PKCE con Google */
  loginWithGoogle(): void {
    this.sdk.oidc.loginWithRedirect();
  }

  /** Procesa el callback OIDC tras el redirect */
  async handleAuthCallback(): Promise<void> {
    // Intercambia código por tokens si hay parámetros en la URL
    await this.sdk.oidc.finishLoginIfNeed();
    // Tokens ya fueron persistidos por el enhancer
    //this.router.navigate(['/home']);
  }

  /** Inicia el flujo WebAuthn (Passkeys) */
  async loginWithPasskeys(identifier: string): Promise<void> {
    const res = await this.sdk.webauthn.signIn(identifier);
    if (!res.ok) {
      throw new Error(res.error?.errorDescription || 'Error en Passkeys');
    }
    // Tokens persistidos automáticamente
    this.router.navigate(['/home']);
  }

  /** Cierra sesión (incluye logout OIDC) */
  async logout(): Promise<void> {
    await this.sdk.oidc.logout();
    this.router.navigate(['/login']);
  }

  /** Indica si hay sesión activa */
  isLoggedIn(): boolean {
    return !!this.sdk.getSessionToken();
  }

  /** Obtiene el JWT de acceso actual */
  getAccessToken(): string {
    return this.sdk.getSessionToken() || '';
  }
}
