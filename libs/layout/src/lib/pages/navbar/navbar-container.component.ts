import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SignalRService } from '../../../_services';
import {
  Conversation,
  SupportActions,
  Tenant,
  TenantActions,
  UserProfileActions,
} from '../../../_store';
import { LayoutActions, Menu } from '../../../_store/layout';
import {
  getName,
  getTenantId,
  getUserId,
  State,
  getAuthenticated,
} from '../../../_store/token';
import { availableUserTenants } from '../../../_store/user-tenants/user-tenants.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TenantSelector from '../../../_store/tenant/tenant.selector';
import { UserTenants, UserTenantsActions } from '@hmo-core/_store/user-tenants';
import { getUserRole, getUser, getDefaultProgram } from '../../../_store/token';
import * as messagingSelector from '../../../_store/messaging/messaging.selector';
import * as Userselector from '@hmo-core/_store/user-profile/user-profile.selector';
@Component({
  selector: 'app-navbar-container',
  templateUrl: './navbar-container.component.html',
})
export class NavbarContainerComponent implements OnInit {
  @Input() menus: Menu[];
  tenantId$: Observable<any>;
  tenantId: string;
  tenant$: Observable<Tenant>;
  tenantUsers$: Observable<UserTenants[]>;
  userName$: Observable<string>;
  authenticated$: Observable<boolean>;
  userRole$: Observable<any>;
  user$: Observable<any>;
  defaultProgram$: Observable<any>;
  messages$: Observable<Conversation[]>;
  userProfile$: Observable<any>;
  userId$: Observable<any>;
  userId: string;
  constructor(
    private store: Store<State>,
    private signalRService: SignalRService
  ) {
    this.tenantId$ = this.store.select(getTenantId);
    this.tenantId$.subscribe((result) => {
      this.tenantId = result;
    });
    this.userId$ = this.store.select(getUserId);
    this.userId$.subscribe((result) => {
      this.userId = result;
    });
  }

  ngOnInit() {
    this.signalRService.startNotificationRequest();
    this.signalRService.addTransferNotificationListener();
    this.store.dispatch(new LayoutActions.LoadMenuAction(''));
    this.store.dispatch(new UserTenantsActions.LoadItemsAction(this.tenantId));
    this.store.dispatch(new TenantActions.LoadItemAction(this.tenantId));
    this.store.dispatch(new SupportActions.LoadItemsAction(''));
    this.store.dispatch(new UserProfileActions.LoadUserAction(this.userId));

    this.tenantUsers$ = this.store.select(availableUserTenants);
    this.tenant$ = this.store.select(TenantSelector.selectedTenant);
    this.userName$ = this.store.select(getName);
    this.authenticated$ = this.store.select(getAuthenticated);
    this.userRole$ = this.store.select(getUserRole);
    this.user$ = this.store.select(getUser);
    this.defaultProgram$ = this.store.select(getDefaultProgram);
    this.messages$ = this.store.select(
      messagingSelector.getMessagingCollection
    );
    this.userProfile$ = this.store.select(Userselector.selectedUserProfile);
  }
}
