import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '.';
import { SecurityService } from './security.service';

@Component({
  selector: 'oriolaent-frontends-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  btnColourClass$: Observable<string>;
  btnSmallClass$: Observable<string>;
  url: string;
  constructor(public securityService: SecurityService,
    private route: ActivatedRoute,
    private store: Store<State>) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    // this.securityService.Logoff();
  }
  public Login() {
    this.securityService.Authorize(this.returnUrl);
  }
}


