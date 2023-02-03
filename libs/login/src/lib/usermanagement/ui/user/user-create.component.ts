import {
  Component, OnInit, Input, Output, EventEmitter,
  ChangeDetectionStrategy, OnChanges, SimpleChanges,
} from '@angular/core';

// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';

// import {
//   UserMgtState, User, UserPassword, UserEntity
// } from './../../redux';

// import {
//   textColorColourClass, btnColourClass, btnSmallColourClass,
// } from 'shared/general/general.selector';
// import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
// import { StyledComponent, SaveDeleteComponent, HeaderComponent } from 'shared';
// import 'ag-grid-enterprise';
@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
  styleUrls: ['user-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserCreateComponent  {
  // @Input() agTheme: string;
  // @Input() users: User[] = [];
  // @Input() userPassword: UserPassword;
  // @Input() userEntity: UserEntity;
  // @Output() add = new EventEmitter();
  // @Output() update = new EventEmitter();
  // @Output() error = new EventEmitter();
  // @Output() selected = new EventEmitter();
  // @Output() changePassword = new EventEmitter();
  // @Output() changeUserName = new EventEmitter();
  // public showDialog = false;
  // textColorColourClass$: Observable<string>;
  // btnClass$: Observable<string>;
  // btnSmallClass$: Observable<string>;
  // form: FormGroup;
  // formUserName: FormGroup;
  // good: boolean;
  // public columnDefs: any[] = [];
  // private ready = false;
  // public gridOptions: GridOptions;
  // private gridApi: GridApi;
  // private gridColumnApi: ColumnApi;
  // private colWidth = 150;
  // private frameworkComponents;
  // showUserName: boolean;
  // display: number;
  // hide: boolean;
  // constructor(private fb: FormBuilder, private store: Store<UserMgtState>) {
  //   this.frameworkComponents = { agColumnHeader: HeaderComponent };
  //   this.gridOptions = <GridOptions>{
  //     context: {
  //       componentParent: this
  //     },
  //     debug: true,
  //     getRowStyle: function (params) {
  //       if (params.node.floating) {
  //         return { 'font-weight': 'bold' };
  //       }
  //     },
  //     rowSelection: 'single',
  //     enableFilter: true,
  //     animateRows: true,
  //     deltaRowDataMode: true,
  //     getRowNodeId: function (data) { return data.id; },
  //     rowData: this.users,
  //     frameworkComponents: this.frameworkComponents,
  //     defaultColDef: {
  //       editable: true,

  //       headerComponentParams: {}
  //     },
  //   };
  // }

  // ngOnInit() {
  //   this.textColorColourClass$ = this.store.select(textColorColourClass);
  //   this.btnClass$ = this.store.select(btnColourClass);
  //   this.btnSmallClass$ = this.store.select(btnSmallColourClass);
  //   this.createColumnDefs();

  //   this.form = this.fb.group({
  //     password: new FormControl(''),
  //     userId: new FormControl(''),

  //   });

  //   this.formUserName = this.fb.group({
  //     userId: new FormControl(''),
  //     email: new FormControl(''),
  //     userName: new FormControl('')
  //   });

  // }

  // ngOnChanges(changes: SimpleChanges): void {

  //   if (changes.users) {
  //     if (this.ready) {
  //       this.gridOptions.api.setRowData(this.users);
  //     }
  //   }

  // }

  // public showuser(e) {
  //   if (e.target.checked) {
  //     this.showUserName = false;
  //   }
  // }

  // onGridReady(params) {
  //   this.ready = true;
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.gridApi.setRowData(this.users);

  // }

  // private createColumnDefs() {
  //   this.columnDefs = [
  //     {
  //       headerName: 'Name', field: 'name',
  //       width: 200,
  //       cellRendererFramework: StyledComponent,
  //       editable: true,
  //       suppressSorting: true,
  //       filterParams: {
  //         applyButton: true,
  //         clearButton: true
  //       }
  //     },
  //     {
  //       headerName: 'User Name', field: 'userName',
  //       width: 150,
  //       cellRendererFramework: StyledComponent,
  //       editable: true,
  //       filter: 'agTextColumnFilter',
  //       filterParams: {
  //         applyButton: true,
  //         clearButton: true
  //       }

  //     },
  //     {
  //       headerName: 'Email Address', field: 'email',
  //       width: 200,
  //       cellRendererFramework: StyledComponent,
  //       editable: true,
  //       filter: 'agTextColumnFilter',
  //       suppressMenuHide: 'true',
  //       filterParams: {
  //         applyButton: true,
  //         clearButton: true
  //       }
  //     },
  //     {
  //       headerName: 'Admin User', field: 'admin',
  //       width: 160,
  //       cellRendererFramework: StyledComponent,
  //       editable: false,
  //     },

  //     {
  //       headerName: 'Change Password', field: 'id',
  //       width: 130,
  //       editable: false,
  //       suppressMenu: true,
  //       cellRendererFramework: SaveDeleteComponent,
  //       cellRendererParams: {
  //         mIcon: 'lock_open', cType: 'passwordChange',
  //       },

  //     },
  //     {
  //       headerName: 'Update', field: 'id',
  //       width: 100,
  //       editable: false,
  //       suppressMenu: true,
  //       cellRendererFramework: SaveDeleteComponent,
  //       cellRendererParams: {
  //         mIcon: 'person', cType: 'updateUserName'
  //       },

  //     },
  //     {
  //       headerName: 'Remove', field: 'id',
  //       width: 100,
  //       editable: false,
  //       suppressMenu: true,
  //       cellRendererFramework: SaveDeleteComponent,
  //       cellRendererParams: {
  //         mIcon: 'delete', cType: 'delete'
  //       },

  //     }
  //   ];
  // }
  // public handleChildMessage(data: any, type: string) {
  //   if (type === 'updateUserName') {
  //     this.display = 1;
  //     this.showDialog = true;
  //     this.formUserName.setValue({ userId: data.id, email: '', userName: '' });

  //   }

  //   if (type === 'passwordChange') {
  //     this.display = 2;
  //     this.showDialog = true;
  //     this.form.setValue({ userId: data.id, password: '' });

  //   }

  // }

  // resetForm(data: any) {
  //   this.showDialog = false;
  //   this.changePassword.emit(data);
  // }
  // closeForm(data: any) {
  //   this.showDialog = false;
  //   this.changeUserName.emit(data);
  // }

  // public onReady(data: any) {
  //   this.ready = true;

  // }
}


