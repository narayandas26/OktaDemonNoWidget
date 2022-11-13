import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaAuthStateService, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';

import { environment as env } from '../environments/environment';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-99325701.okta.com/oauth2/default',
  clientId: '0oa78fyk27TTe4PSO5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
});

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    OktaAuthModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent, canActivate: [OktaAuthGuard] },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [OktaAuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'login/callback', component: HomeComponent }
    ]),
  ],
  providers: [
    //{
    //  provide: HTTP_INTERCEPTORS,
    //  useClass: AuthHttpInterceptor,
    //  multi: true,
    //},
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: Window,
      useValue: window,
    },
    { provide: APP_BASE_HREF, useValue: env.appBaseHref },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
