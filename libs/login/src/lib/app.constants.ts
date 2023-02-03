import {Injectable} from '@angular/core';

import {Observable, Subject, of} from 'rxjs';
// import {  } from './shared/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {map, catchError} from 'rxjs/operators';

@Injectable()
export class Configuration {
    public apiServer = ''; // 'http://localhost:5502/api';
    public idServer = ''; // 'http://localhost:5000/';
    public returnUrl = ''; // 'http://localhost:4200/';
    public useBackend = true;
    public apiLocal = '/api';
    public clientId = ''; // 'OryxHR.webapi';
    public scope = ''; // 'openid profile OryxHR email role';
    public data = '/assets/data/';
    public b1Server = 'http://localhost:39930/api';
    public apiUploadFolder = this.apiServer + '/uploads';
    public prompt = 'none';
    public constants!: Constants;
    protected constantsFile = '';
    public transportType = 0;
    public isLogLevelDebugEnabled = false;
    public isLogLevelWarningEnabled = false;
    public _onConfigurationLoaded = new Subject<boolean>();
    public authWellKnownEndpoints = new AuthWellKnownEndpoints();
    public responseType = '';
    storage = typeof Storage !== 'undefined' ? sessionStorage : null;
    wellKnownEndpoints: any;
    constructor(protected _http: HttpClient, protected store: Store < State >) {}
    public getConstantJson(): Observable < Constants > {
        return this._http.get(this.constantsFile).pipe(map((res: Constants) => res));
    }
    public load() {
        return new Promise((resolve, reject) => this.getConstantJson().subscribe(c => {
            this.apiServer = c.apiServer;
            this.useBackend = c.useBackend;
            this.apiLocal = c.apiUploadFolder;
            this.transportType = c.transportType;
            this.data = c.returnUrl + this.data;
            this.store.dispatch(new SetConfigurationAction(c));
            this.isLogLevelDebugEnabled = c.logLevel === 'debug' ? true : false;
            this.isLogLevelWarningEnabled = c.logLevel === 'warning' ? true : false;
            this.responseType = c.responseType;
            this.returnUrl = c.returnUrl;
            // this.load_using_stsServer(c.idServer);
            resolve(true);
        }));
    }

    load_using_stsServer(stsServer: string) {
        const url = `${stsServer}.well-known/openid-configuration`;

        this._http.get(url).pipe(map(response => {
            this.wellKnownEndpoints = response;
            this.authWellKnownEndpoints.setWellKnownEndpoints(response);
            console.log(this.authWellKnownEndpoints);
            this.store.dispatch(new SetIdConfiguration(this.authWellKnownEndpoints));
            this._onConfigurationLoaded.next(true);
        }), catchError(error => {
            console.error(`OidcConfigService 'load_using_stsServer' threw an error on calling ${stsServer}`, error);
            this._onConfigurationLoaded.next(false);
            return of(false);
        })).subscribe();
    }
}
