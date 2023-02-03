import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from 'shared/core';



@Injectable()
export class LoggerService {
    isLogLevelWarningEnabled = false;
    isLogLevelDebugEnabled = false;

    constructor( private ngrxStore: Store<State>) {
        this.ngrxStore.select(appState => appState.appDetails.configuration)
        .subscribe(_configuration => {
          this.isLogLevelDebugEnabled = _configuration.isLogLevelDebugEnabled;
          this.isLogLevelWarningEnabled = _configuration.isLogLevelWarningEnabled;
        });
    }

    logError(message: any) {
        console.error(message);
    }

    logWarning(message: any) {
        if (this.isLogLevelWarningEnabled) {
            console.warn(message);
        }
    }

    logDebug(message: any) {
        if (this.isLogLevelDebugEnabled) {
            console.log(message);
        }
    }
}
