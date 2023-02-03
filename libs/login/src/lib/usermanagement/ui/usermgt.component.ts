import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserMgtState } from '../redux';
import {
  btnColourClass,
  btnSmallColourClass
} from '../../../general/general.selector';
import { Menu, } from '../../../general';
@Component({
  selector: 'app-usermgt',
  templateUrl: 'usermgt.component.html',
  styleUrls: ['usermgt.component.scss']
})

export class UserMgtComponent implements OnInit {
  menus$: Observable<Menu[]>;
  btnClass$: Observable<string>;
  btnSmallClass$: Observable<string>;
  selectedIndex: number;
  constructor(private store: Store<UserMgtState>) { }

  ngOnInit() {
    // this.menus$ = this.store.select(Usermnagement);
    this.btnClass$ = this.store.select(btnColourClass);
    this.btnSmallClass$ = this.store.select(btnSmallColourClass);
  }

  select(index: number) {
    this.selectedIndex = index;
  }

}
