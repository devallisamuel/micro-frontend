import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShellbarUser, ShellbarUserMenu } from '@fundamental-ngx/core/shellbar';

@Component({
  selector: 'oriolaent-frontends-shellbar-ui',
  templateUrl: './shellbar-ui.component.html',
  styleUrls: ['./shellbar-ui.component.scss'],
})
export class ShellbarUIComponent implements OnInit {
  @Output() logOff = new EventEmitter<string>();
  @Input() userData: any;
  condensed=false;


  user: ShellbarUser = {
    colorAccent: 6
  };

  userMenu: ShellbarUserMenu[] = [
    { text: 'Settings', callback: this.settingsCallback },
    { text: 'Sign Out', callback: this.signOutCallback }
  ];


  constructor() {
    //this.logOff = new EventEmitter();
    if(this.userData)
      this.user.fullName = this.userData.name;
  }

  ngOnInit() {
    this.logOff = new EventEmitter();
    if(this.userData)
      this.user.fullName = this.userData.name;
  }


  settingsCallback(): void {
    alert('Settings Clicked');
  }

  signOutCallback(): void {
    if(this.logOff)
      this.logOff.emit("[Call] Log Off");
  }
}
