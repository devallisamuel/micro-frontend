import { Injectable } from '@angular/core';
import { OidcSecurityStorage } from './oidc.security.storage';

export type SilentRenewState = 'running' | '';

@Injectable()
export class OidcSecurityCommon {
    // tslint:disable-next-line:variable-name
    private storage_auth_result = 'authorizationResult';

    public get authResult(): any {
        return this.retrieve(this.storage_auth_result);
    }

    public set authResult(value: any) {
        this.store(this.storage_auth_result, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_access_token = 'ihmAngularClient_authorizationData';

    public get accessToken(): string {
        return this.retrieve(this.storage_access_token) || '';
    }

    public set accessToken(value: string) {
        this.store(this.storage_access_token, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_id_token = 'ihmAngularClient_authorizationDataIdToken';

    public get idToken(): string {
        return this.retrieve(this.storage_id_token) || '';
    }

    public set idToken(value: string) {
        this.store(this.storage_id_token, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_is_authorized = '_isAuthorized';

    public get isAuthorized(): boolean | undefined {
        return this.retrieve(this.storage_is_authorized);
    }

    public set isAuthorized(value: boolean | undefined) {
        this.store(this.storage_is_authorized, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_user_data = 'userData';

    public get userData(): any {
        return this.retrieve(this.storage_user_data);
    }

    public set userData(value: any) {
        this.store(this.storage_user_data, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_auth_nonce = 'authNonce';

    public get authNonce(): string {
        return this.retrieve(this.storage_auth_nonce) || '';
    }

    public set authNonce(value: string) {
        this.store(this.storage_auth_nonce, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_auth_state_control = 'authStateControl';

    public get authStateControl(): string {
        return this.retrieve(this.storage_auth_state_control) || '';
    }

    public set authStateControl(value: string) {
        this.store(this.storage_auth_state_control, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_session_state = 'session_state';

    public get sessionState(): any {
        return this.retrieve(this.storage_session_state);
    }

    public set sessionState(value: any) {
        this.store(this.storage_session_state, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_silent_renew_running = 'storage_silent_renew_running';

    public get silentRenewRunning(): SilentRenewState {
        return this.retrieve(this.storage_silent_renew_running) || '';
    }

    public set silentRenewRunning(value: SilentRenewState) {
        this.store(this.storage_silent_renew_running, value);
    }

    // tslint:disable-next-line:variable-name
    private storage_custom_request_params = 'storage_custom_request_params';

    public get customRequestParams(): {
        [key: string]: string | number | boolean;
    } {
        return this.retrieve(this.storage_custom_request_params);
    }

    public set customRequestParams(value: { [key: string]: string | number | boolean }) {
        this.store(this.storage_custom_request_params, value);
    }

    constructor(private oidcSecurityStorage: OidcSecurityStorage) {}

    private retrieve(key: string): any {
        return this.oidcSecurityStorage.read(key);
    }

    private store(key: string, value: any) {
        this.oidcSecurityStorage.write(key, value);
    }

    resetStorageData(isRenewProcess: boolean) {
        if (!isRenewProcess) {
            this.store(this.storage_auth_result, '');
            this.store(this.storage_session_state, '');
            this.store(this.storage_silent_renew_running, '');
            this.store(this.storage_is_authorized, false);
            this.store(this.storage_access_token, '');
            this.store(this.storage_id_token, '');
            this.store(this.storage_user_data, '');
        }
    }

    getAccessToken(): any {
        return this.retrieve(this.storage_access_token);
    }

    getIdToken(): any {
        return this.retrieve(this.storage_id_token);
    }
}
