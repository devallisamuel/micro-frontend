import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HmoDialogComponent } from './hmo-onboarding-dialog.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject, timer } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { SafeUrl } from '@angular/platform-browser';

import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import {
  selectedTenant,
  selectTenantLoading,
} from '@hmo-core/_store/tenant/tenant.selector';
import {
  FileUploadService,
  OnboardingService,
  SecurityService,
} from '../../../_services';
import {
  Tenant,
  NotificationActions,
  HospitalBandActions,
  TenantActions,
} from '../../../_store';
import { State } from '../../../_store/token/tokenState.reducer';
@Component({
  selector: 'app-hmo-onboarding',
  templateUrl: './hmo-onboarding.component.html',
  styleUrls: ['./hmo-onboarding.component.scss'],
})
export class HmoOnboardingComponent implements OnInit {
  selectedTenant$: Observable<Tenant>;
  name = 'Mail Setup';
  idSetup = 'Identification Number Setup';
  band = 'Hospital Band';
  payment = 'Payment Key Setup';
  tenant: Tenant;
  userImage$: Observable<SafeUrl>;
  userImage: SafeUrl;
  userImage2: SafeUrl;
  url = 'tenantHmo/UpdatePicture/';
  url2 = 'tenantHmo/UpdateLogobrand/';
  destroy$: Subject<void> = new Subject<void>();
  TenantLoading$: Observable<boolean>;
  imageToUpload;
  infoForm: FormGroup;
  tenantForm: FormGroup;
  idForm: FormGroup;
  hospitalBandForm: FormGroup;
  paymentKeyForm: FormGroup;
  mailForm: FormGroup;
  case = 1;
  idGroup;
  bandGroup;
  paymentIntegrationGroup;
  paystackAdded = false;
  flutterwaveAdded = false;
  uploading = false;
  showDark;
  setUpPayment: FormGroup;
  constructor(
    public dialog: MatDialog,
    private store: Store<State>,
    public fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private onboardingService: OnboardingService,
    private securityService: SecurityService
  ) {}

  ngOnInit() {
    this.selectedTenant$ = this.store.select(selectedTenant);
    this.selectedTenant$
      .pipe(
        skipWhile((u) => !u),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.tenant = result;
      });
    if (this.tenant) {

    }
    this.setUpPayment = this.fb.group({
      noPayment: [false],
    });
    this.showDark = JSON.parse(localStorage.getItem('theme'));
    this.TenantLoading$ = this.store.select(selectTenantLoading);
    this.infoForm = this.fb.group({
      businessName: [this.tenant.businessName, Validators.required],
      description: [this.tenant.description],
      logo: [this.tenant.logo],
      logo2: [this.tenant.logo2],
    });
    this.idGroup = this.fb.array([]);
    this.bandGroup = this.fb.array([]);
    this.paymentIntegrationGroup = this.fb.array([]);
    this.addBand();
    this.idGroup = this.fb.array([]);
    this.tenant?.settings?.forEach((element) => {
      this.idGroup.push(
        this.fb.group({
          tenantId: [element.tenantId],
          name: [element.name, Validators.required],
          labelName: [element.labelName],
          prefix: [
            element.prefix,
            Validators.compose([
              Validators.required,
              dynamicIdPatternValidator,
            ]),
          ],
          value: [
            element.value,
            Validators.compose([Validators.required, staticIdPatternValidator]),
          ],
        })
      );
    });
    this.mailForm = this.fb.group({
      serverAddress: [this.tenant?.mailOptions?.serverAddress],
      serverPort: [this.tenant?.mailOptions?.serverPort],
      secureOption: [this.tenant?.mailOptions?.secureOption],
      senderUserName: [this.tenant?.mailOptions?.senderUserName],
      senderPassword: [this.tenant?.mailOptions?.senderPassword],
      senderName: [this.tenant?.mailOptions?.senderName],
      addOAUTH: [this.tenant?.mailOptions?.addOAUTH],
    });
    this.idForm = this.fb.group({});
    const dialogRef = this.dialog.open(HmoDialogComponent, {
      width: '50%',
      disableClose: true,
      data: {
        username: this.tenant.name,
      },
    });
  }

  addBand() {
    this.bandGroup.push(
      this.fb.group({
        name: [''],
        description: [''],
        tenantId: [this.tenant.id],
        status: [true],
      })
    );
  }

  addPaystack() {
    this.paystackAdded = true;
    this.paymentIntegrationGroup.push(
      this.fb.group({
        name: ['Paystack'],
        active: [true],
        secretKey: ['', Validators.required],
        publicKey: ['', Validators.required],
        encryptionKey: [''],
      })
    );
  }

  addFlutterwave() {
    this.flutterwaveAdded = true;
    this.paymentIntegrationGroup.push(
      this.fb.group({
        name: ['Flutterwave'],
        active: [true],
        secretKey: ['', Validators.required],
        publicKey: ['', Validators.required],
        encryptionKey: [''],
      })
    );
  }

  cancel() {
    this.securityService.Logoff();
  }

  complete() {
    const tenantToUpdate = Object.assign({}, this.tenant);
    tenantToUpdate.mailOptions = this.mailForm.value;
    tenantToUpdate.settings = this.idGroup.value;
    tenantToUpdate.paymentIntegrations = this.paymentIntegrationGroup.value;
    tenantToUpdate.description = this.infoForm.get('description').value;
    tenantToUpdate.isFirstLogin = false;
    this.store.dispatch(new TenantActions.UpdateItemAction(tenantToUpdate));

    if (this.bandGroup.value.name !== "") {
      this.store.dispatch(
        new HospitalBandActions.AddItemAction(this.bandGroup.value)
      );
    }
    this.onboardingService.gotoDashboard();
  }

  next(pageNumber) {
    this.case = pageNumber;
  }
  previous(pageNumber) {
    this.case = pageNumber;
  }

  removeBand(i) {
    this.bandGroup.removeAt(i);
  }

  removePaystack() {
    this.paystackAdded = false;
    this.paymentIntegrationGroup.removeAt(
      this.paymentIntegrationGroup.value.findIndex(
        (payment) => payment.name === 'Paystack'
      )
    );
  }

  removeFlutterwave() {
    this.flutterwaveAdded = false;
    this.paymentIntegrationGroup.removeAt(
      this.paymentIntegrationGroup.value.findIndex(
        (payment) => payment.name === 'Flutterwave'
      )
    );
  }

  public onImageSelected(event) {
    this.imageToUpload = <File>event.target.files[0];
    if (this.imageToUpload) {
      const reader = new FileReader();
      this.uploading = true;

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.userImage = event.target.result;
        // this.cdr.detectChanges();
      };
      return this.uploadLogo();
    }
  }
  public onImageSelected2(event) {
    this.imageToUpload = <File>event.target.files[0];
    if (this.imageToUpload) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.userImage2 = event.target.result;
        // this.cdr.detectChanges();
      };
      return this.uploadLogo2();
    }
  }
  handleFileImage(files: FileList) {
    this.imageToUpload = files.item(0);
  }

  uploadLogo() {
    this.store.dispatch(new NotificationActions.SetSaving('Uploading File'));
    this.fileUploadService
      .postFile(this.imageToUpload, this.url + this.tenant.id)
      .subscribe(
        (result) => {
          this.infoForm.patchValue({
            logo: result.logo,
          });
          this.uploading = false;
          this.store.dispatch(
            new NotificationActions.SetSaved('File uploaded successfully')
          );
        },
        () => {
          this.uploading = false;
          this.store.dispatch(
            new NotificationActions.SetSavingError('Error uploading file')
          );
        }
      );
  }
  uploadLogo2() {
    this.store.dispatch(new NotificationActions.SetSaving('Uploading File'));
    this.fileUploadService
      .postFile(this.imageToUpload, this.url2 + this.tenant.id)
      .subscribe(
        () => {
          this.store.dispatch(
            new NotificationActions.SetSaved('File uploaded successfully')
          );
        },
        () => {
          this.store.dispatch(
            new NotificationActions.SetSavingError('Error uploading file')
          );
        }
      );
  }
}

export function dynamicIdPatternValidator(control: FormControl): {
  [key: string]: any;
} {
  if (control.value && !control.value.endsWith('/')) {
    return { invalidDynamicPattern: true };
  }
}

export function staticIdPatternValidator(control: FormControl): {
  [key: string]: any;
} {
  const regexp = /^-?\d*[.,]?\d{0,2}$/;
  if (control.value && !regexp.test(control.value)) {
    return { invalidStaticPattern: true };
  }
}
