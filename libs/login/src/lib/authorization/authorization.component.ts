import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'shared';
import { selectIsAuthenticated } from 'ondgoui/redux';
import { AuthService } from '../auth.service';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<State>,
              private router: Router,
              private securityService: SecurityService) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.isAuthenticated$.subscribe(result => {
      if (result) {
        this.securityService.dispatchToStore();
        this.router.navigate(['/home']);
      }
    });

  }

}
