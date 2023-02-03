import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval, Subscription, Subject } from 'rxjs';

import * as moment from 'moment';
import { map, skipWhile, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  Tenant,
  Enrollee,
  Conversation,
  TenantActions,
  SupportActions,
  UserProfileActions,
} from '../../../_store';
import * as TenantSelector from '../../../_store/tenant/tenant.selector';
// import { SignalRNotification } from '../../../_interfaces/notification.interface';
import { Router } from '@angular/router';
import * as messagingSelector from '../../../_store/messaging/messaging.selector';
import { ThemeService } from '@infusync-frontend/infusync-ui';
import {
  ResponsiveService,
  FileUploadService,
  OnboardingService,
  SignalRService,
  SecurityService,
} from '../../../_services';
import {
  getUser,
  getUserRole,
  getAuthenticated,
  getTenantId,
  getName,
  getDefaultProgram,
  getUserId,
} from '../../../_store/token';
import { LayoutActions, Menu } from '../../../_store/layout';
import { UserTenants, UserTenantsActions } from '../../../_store/user-tenants';
import {
  availableUserTenants,
  getUserTenantCollection,
} from '../../../_store/user-tenants/user-tenants.selector';
import { State } from '../../../_store/token';
import { SignalRNotification } from '../../../_interfaces';
import { MessagingService } from 'apps/hmo/src/app/features/messages/messaging.service';
import * as Userselector from '@hmo-core/_store/user-profile/user-profile.selector';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SpeechRecogDialogComponent } from './speech-recog-dialog/speech-recog-dialog';
declare const annyang: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() menus: Menu[];
  // @Output() sidenavToggle = new EventEmitter();
  @ViewChild('insideElement', { static: false }) insideElement;

  @Input() tenantId: string;
  @Input() tenantInfo: Tenant;
  @Input() tenantUsers: UserTenants[];
  @Input() userName;
  @Input() authenticated: boolean;
  @Input() userRole: any;
  @Input() user: any;
  @Input() defaultProgram: any;
  // @Input() messages: Conversation[];
  @Input() userProfile: any;

  hmoMenu;
  showChild = false;
  companyImage: string;
  userImage: string;
  registered = true;
  updateImage: Subscription;
  imgURL: string;
  currentParent;
  showImage: string;
  messages;

  initialTime: moment.Moment;
  currentTime: Observable<string>;
  // showFiller = false;
  fullScreen = true;
  smallScreenToggler = false;
  // destroy$: Subject<void> = new Subject<void>();
  isDarkTheme: boolean;
  sub: Subscription;
  showDark;
  // expanded = false;
  unread: number;
  notifications: SignalRNotification[];
  currentTenantId;
  defaultProgramCode: '';
  programCode;
  constructor(
    private store: Store<State>,
    private responsive: ResponsiveService,
    public breakpointObserver: BreakpointObserver,
    private onboardingService: OnboardingService,
    private securityService: SecurityService,
    private themeService: ThemeService,
    private cdRef: ChangeDetectorRef,
    private signalRService: SignalRService,
    private router: Router,
    private messagingService: MessagingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.signalRService.startNotificationRequest();
    this.signalRService.addTransferNotificationListener();
    this.signalRService.startMessageRequest();
    this.signalRService.addTransferMessageListener();
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.signalRService.currentNotifications.subscribe(
      (notif) => (this.notifications = notif)
    );
    document.addEventListener('click', this.onDocumentClick);
    this.defaultProgramCode = this.defaultProgram;

    const selectedId = localStorage.getItem('selectedTenantId');
    if (selectedId) {
      this.currentTenantId = selectedId;
    } else {
      this.currentTenantId = this.tenantId;
      // this.changeTenant(null);
    }

    this.programCode = localStorage.getItem('programCode');

    if (!this.programCode && this.currentTenantId === this.tenantId) {
      this.programCode = this.defaultProgramCode;
      localStorage.setItem('programCode', this.programCode);
    }
    if (
      this.userRole === 'Super Administrators' ||
      this.userRole !== 'Super Administrators'
    ) {
      this.hmoMenu = true;
      this.cdRef.detectChanges();
    }
    this.isDarkTheme = JSON.parse(localStorage.getItem('theme'));
    this.showDark = JSON.parse(localStorage.getItem('theme'));
    if (this.messages?.length > 0) {
      this.unread = this.messagingService.getTotalUnreadMessages(
        this.messages,
        this.tenantId
      );
    }

    if (this.hmoMenu) {
      if (this.tenantInfo) {
        if (this.messages?.length > 0) {
          this.unread = this.messagingService.getTotalUnreadMessages(
            this.messages,
            this.tenantId
          );
        }
        this.companyImage = this.imgURL ? this.imgURL : this.tenantInfo.logo;
      }
    }

    this.currentTime = interval(1000 * 2).pipe(
      map(() => {
        this.initialTime = moment(new Date());
        return this.initialTime.format('llll');
      })
    );
    this.breakpointObserver
      .observe(['(max-width: 1026px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.smallScreenToggler = true;
          this.fullScreen = false;
        } else {
          this.smallScreenToggler = false;
          this.fullScreen = true;
        }
      });

    this.onboardingService.profileImage.subscribe(
      (image) => (this.imgURL = image)
    );
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  hrClick() {
    this.navigate();
  }

  chmClick() {
    this.router.navigate(['/hmo-support']);
  }

  changeTenant(selectedTenant) {
    if (selectedTenant) {
      if (selectedTenant.tenantId !== this.tenantId) {
        localStorage.setItem('selectedTenantId', selectedTenant.tenantId);
        this.currentTenantId = selectedTenant.tenantId;
        this.programCode = '';
        localStorage.removeItem('programCode');
      } else {
        localStorage.setItem('selectedTenantId', '');
        this.currentTenantId = this.tenantId;
        this.changeProgram(null);
      }
    } else {
      this.currentTenantId = this.tenantId;
      localStorage.setItem('selectedTenantId', '');
      this.changeProgram(null);
    }
    window.location.reload();
  }

  changeProgram(program) {
    if (
      program &&
      program.code?.toLowerCase() !== this.programCode?.toLowerCase()
    ) {
      localStorage.setItem('programCode', program.code?.toLowerCase());
      localStorage.setItem('programData', JSON.stringify(program));
      this.programCode = program.code?.toLowerCase();
      window.location.reload();
    }
  }

  onLogout() {
    this.securityService.Logoff();
  }

  getProgramName(code) {
    if (
      this.tenantInfo &&
      this.tenantInfo.programs &&
      this.tenantInfo.programs.length > 0
    ) {
      return this.tenantInfo.programs.find(
        (x) => x.code?.toLowerCase() === code?.toLowerCase()
      )?.name;
    } else {
      return '';
    }
  }

  getTenantName(id) {
    if (this.tenantUsers?.length > 0) {
      return this.tenantUsers.find((x) => x.tenantId === id)?.tenantName;
    } else {
      return '';
    }
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    // this.showDark = checked;
  }

  toggleSidebar() {
    if (this.fullScreen == true) {
      this.fullScreen = false;
      this.responsive.changeWidth(this.fullScreen);
    } else {
      this.fullScreen = true;
      this.responsive.changeWidth(this.fullScreen);
    }
  }

  smallScreenToggle(item) {
    if (item && item.children) {
      this.currentParent = item.name;
      this.showChild = !this.showChild;
    } else {
      this.currentParent = '';
      this.showChild = false;
    }
    if (this.smallScreenToggler == true) {
      this.fullScreen = false;
      this.responsive.changeWidth(this.fullScreen);
    }
  }

  enter() {
    if (!this.fullScreen) {
      this.toggleSidebar();
    }
  }

  setTenantUsers(tenants) {
    this.tenantUsers = tenants;
  }

  showSub(item) {
    if (item && item.children) {
      this.currentParent = item.name;
      this.showChild = true;
    }
  }

  protected onDocumentClick(event: MouseEvent) {
    if (this.insideElement.nativeElement.contains(event.target)) {
      return;
    }
    this.smallScreenToggle(null);
  }

  ngOnDestroy() {
    this.cdRef.detach();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  navigate = () => {
    if (this.hmoMenu) {
      this.router.navigate(['/messages/messages/view']);
    }
  };

  openSpeechRecogDialog() {
    const dialogRef = this.dialog.open(SpeechRecogDialogComponent, {
      width: '500px',
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      // close annyang
      if (annyang) {
        annyang.abort();
      }
    });
  }

  navSpeechLoader() {
    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      const commands = {
        'go to *url': (url) => {
          if (url === 'dashboard' || url === 'dashboards')
            this.router.navigate(['/home']);
          if (url === 'plan benefit' || url === 'plan benefits')
            this.router.navigate(['/planbenefit/planbenefit/view']);
          if (url === 'changes') this.router.navigate(['/change/change/view']);
          if (url === 'authorization' || url === 'authorizations')
            this.router.navigate(['/authorization/authorization/view']);
          if (url === 'plans' || url === 'plan')
            this.router.navigate(['/plan/plan/view']);
          if (url === 'encounter' || url === 'encounters')
            this.router.navigate(['/encounter/encounter/view']);
          if (url === 'referral' || url === 'referrals')
            this.router.navigate(['/referral/referral/view']);
          if (url === 'company' || url === 'companys')
            this.router.navigate(['/company/company/view']);
          if (url === 'enrollee' || url === 'enrollees')
            this.router.navigate(['/enrollee/enrollee/view']);
          if (url === 'attendance')
            this.router.navigate(['/attendance/attendance/view']);
          if (url === 'payment advice')
            this.router.navigate(['/payment/payment/view']);
          if (url === 'claims') this.router.navigate(['/billing/billing/view']);
          if (url === 'settlement' || url === 'settlements')
            this.router.navigate(['/settlement/settlement/view']);
          if (url === 'invoice')
            this.router.navigate(['/invoice/invoice/view']);
          if (url === 'hospital' || url === 'hospitals')
            this.router.navigate(['/hospital/hospital/view']);
          if (url === 'subscription' || url === 'subscriptions')
            this.router.navigate(['/subscription/subscription/view']);
          if (url === 'individual' || url === 'individuals')
            this.router.navigate(['/individual/individual/view']);
          if (url === 'service tariff' || url === 'service tariffs')
            this.router.navigate(['/service-tariff/service-tariff/view']);
          if (url === 'on boarding')
            this.router.navigate(['/onboarding/onboarding/view']);
          if (url === 'human resource' || url === 'human resources')
            this.router.navigate(['/employee/employee/view']);
          if (url === 'settings' || url === 'setting')
            this.router.navigate(['/settings/settings/view']);
        },
        // sign out of application
        'log out': () => {
          this.onLogout();
        },
        'sign out': () => {
          this.onLogout();
        },
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.start();
    }
  }
}
