import { Injectable } from '@angular/core';
import { Configuration } from './../app.constants';

/**
 * Implement this class-interface to create a custom storage.
 */
@Injectable()
export abstract class OidcSecurityStorage {
    /**
     * This method must contain the logic to read the storage.
     * @param key
     * @return The value of the given key
     */
    public abstract read(key: string): any;

    /**
     * This method must contain the logic to write the storage.
     * @param key
     * @param value The value for the given key
     */
    public abstract write(key: string, value: any): void;
}

@Injectable()
export class BrowserStorage implements OidcSecurityStorage {
    private hasStorage: boolean;

    constructor(private authConfiguration: Configuration) {
        this.hasStorage = typeof Storage !== 'undefined';
    }

    public read(key: string): any {
        if (this.hasStorage) {
            return JSON.parse(this.authConfiguration.storage.getItem(key +
                '_' + this.authConfiguration.clientId));
        }

        return;
    }

    public write(key: string, value: any): void {
        if (this.hasStorage) {
            value = value === undefined ? null : value;
            this.authConfiguration.storage.setItem(key + '_' +
                this.authConfiguration.clientId, JSON.stringify(value));
        }
    }
}
