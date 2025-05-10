/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Not Found Component
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthCallbackComponent } from './core/authentication/auth-callback.component';

/**
 * Fallback to this route when no prior route is matched.
 */
const routes: Routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  {
    path: '**',
    component: NotFoundComponent
  }
];

/**
 * App Routing Module.
 *
 * Configures the fallback route.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
