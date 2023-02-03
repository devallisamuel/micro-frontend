import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  MaterialCssVarsService,
  MatCssHueColorContrastMapItem,
} from 'angular-material-css-vars';

@Injectable()
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  palettePrimary: MatCssHueColorContrastMapItem[] = [];
  constructor(public materialCssVarsService: MaterialCssVarsService) {}

  setDarkTheme(isDarkTheme: boolean) {
    this.materialCssVarsService.setDarkTheme(isDarkTheme);
    this._darkTheme.next(isDarkTheme);
    localStorage.setItem('theme', isDarkTheme.toString());
  }

  setPrimary(hex: string) {
    if (hex) {
      this.materialCssVarsService.setPrimaryColor(hex);
      this.palettePrimary =
        this.materialCssVarsService.getPaletteWithContrastForColor(hex);
      localStorage.setItem('pry', hex);
    }
  }
  setAccent(hex:string) {
    if (hex) {
      this.materialCssVarsService.setAccentColor(hex);
      localStorage.setItem('sec', hex);
    }
  }
  setWarn(hex:string) {
    if (hex) {
      this.materialCssVarsService.setWarnColor(hex);
      localStorage.setItem('ter', hex);
    }
  }

  setAutoContrast() {
    this.materialCssVarsService.setAutoContrastEnabled(true);
  }
}
