import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  title = 'okta-angular-quickstart';
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

  public ngOnInit(): void {
    this.checkIsAuthenticated();
    console.log('on init:');
    let authenticatedVal: boolean = true;
    this.isAuthenticated$.subscribe(event => authenticatedVal = event);
    console.log(authenticatedVal);
  }

  private checkIsAuthenticated() {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => {
        this._router.navigate(['']);
      }
    );
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}