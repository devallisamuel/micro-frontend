import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BaseServiceService } from './base-service.service';
import FileSaver from 'file-saver';
import { map } from 'rxjs/operators';


@Injectable()
export class FileUploadService {
  constructor(
    private baseService: BaseServiceService,
    private sanitizer: DomSanitizer
  ) {}

  postFile(selectedFile: File, urlPart: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    const selectedCode = localStorage.getItem('programCode');
    const params = new HttpParams().set('program', selectedCode);
    const headers = new HttpHeaders()
    // .set('Content-Type', 'multipart/form-data');
    return this.baseService.uploadFile(formData, urlPart, params, headers
    );
  }

    downloadFileAndSaveExcel(urlPart: string, fileName: string) {
    return this.baseService.downloadFile(urlPart).pipe(
      map((response) => {
        const file = new Blob([response], {
          type: 'application/vnd.ms-excel;charset=utf-8',
        });
        FileSaver.saveAs(file, `${fileName}.csv`);
        return true;
      })
    );
  }

  // postMultipleFile(
  //   selectedFile: File,
  //   multiple: [],
  //   urlPart: string
  // ): Observable<boolean> {
  //   const endpoint = this.getUrl(urlPart);
  //   const formData: FormData = new FormData();
  //   formData.append('file', selectedFile, selectedFile.name);
  //   formData.append('hospitals', JSON.stringify(multiple));
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: this.getBlobHeaders() })
  //     .pipe(
  //       map((success) => {
  //         return success;
  //       }),
  //       catchError((e) => this.handleError(e))
  //     );
  // }

  // postMessageFile(
  //   selectedFile: File,
  //   message: any,
  //   urlPart: string
  // ): Observable<boolean> {
  //   const endpoint = this.getUrl(urlPart);
  //   const formData: FormData = new FormData();
  //   formData.append('file', selectedFile, selectedFile.name);
  //   formData.append('message', JSON.stringify(message));
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: this.getBlobHeaders() })
  //     .pipe(
  //       map((success) => {
  //         return success;
  //       }),
  //       catchError((e) => this.handleError(e))
  //     );
  // }

  // postFilee(selectedFile: File, urlPart: string): Observable<boolean> {
  //   const endpoint = this.getIdUrl(urlPart);
  //   console.log(selectedFile);
  //   const formData: FormData = new FormData();
  //   formData.append('file', selectedFile, selectedFile.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: this.getBlobHeaders() })
  //     .pipe(
  //       map(() => {
  //         return true;
  //       }),
  //       catchError((e) => this.handleError(e))
  //     );
  // }
  // postFormFile(formfile: any, urlPart: string): Observable<any> {
  //   const endpoint = this.getUrl(urlPart);
  //   return this.add(formfile, urlPart).pipe(
  //     map(() => {
  //       return true;
  //     }),
  //     catchError((e) => this.handleError(e))
  //   );
  // }

  // postFiles(filesToUpload: File[], urlPart: string): Observable<boolean> {
  //   const endpoint = this.getUrl(urlPart);
  //   const formData: FormData = new FormData();
  //   let i = 0;
  //   filesToUpload.map((fileToUpload) => {
  //     i++;
  //     formData.append('file' + i.toString(), fileToUpload, fileToUpload.name);
  //   });
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: this.getBlobHeaders() })
  //     .pipe(
  //       map(() => {
  //         return true;
  //       }),
  //       catchError((e) => this.handleError(e))
  //     );
  // }

  // downloadFile(urlPart: string): Observable<File> {
  //   console.log(urlPart);
  //   return this.GetBlob(urlPart).pipe(
  //     map((file) => {
  //       console.log(file);
  //       return file;
  //     }),
  //     catchError((e) => this.handleError(e))
  //   );
  // }

  // // downloadPdfStream(urlPart: string, params: any): Observable<File> {
  // //   console.log(urlPart);
  // //   return this.PostAndReturnPdf(urlPart, params).pipe(
  // //     map((file) => {
  // //       console.log(file);
  // //       return file;
  // //     }),
  // //     catchError((e) => this.handleError(e)));
  // // }

  // downloadFileAndSave(
  //   urlPart: string,
  //   params: any | null
  // ): Observable<boolean> {
  //   if (params) {
  //     return this.PostAndReturnBlob(urlPart, params).pipe(
  //       map((response) => {
  //         const fileName = getFileNameFromResponseContentDisposition(response);
  //         if (fileName) {
  //           FileSaver.saveAs(response.body, fileName);
  //           return true;
  //         }
  //         return false;
  //       })
  //     );
  //   } else {
  //     return this.GetBlob(urlPart).pipe(
  //       map((response) => {
  //         const fileName = getFileNameFromResponseContentDisposition(response);
  //         if (fileName) {
  //           FileSaver.saveAs(response.body, fileName);
  //           return true;
  //         }
  //         return false;
  //       })
  //     );
  //   }
  // }
  // downloadFileAndSave2(urlPart: string, params: any): void {
  //   this._http
  //     .get(this.getUrl(urlPart), {
  //       headers: this.getBlobHeaders(),
  //       responseType: 'blob',
  //     })
  //     .subscribe((response: any) => {
  //       if (params) {
  //         FileSaver.saveAs(response, params);
  //       }
  //     });
  // }
  // // downloadPdfFileAndSave2(urlPart: string, params: any, fileName: string): void {
  // //   console.log(urlPart);
  // //   this.downloadPdfStream(urlPart, params,)
  // //     .subscribe((response: any) => {
  // //       let blob = new Blob([response], { type: 'application/pdf' });
  // //       if (fileName) {
  // //         FileSaver.saveAs(blob, fileName);
  // //       }
  // //     });

  // // }



  // getImageFromBackend(urlPart: string): Observable<SafeUrl> {
  //   let blob: Blob;
  //   return this.GetBlob(urlPart).pipe(
  //     map((response) => {
  //       const urlCreator = window.URL;
  //       return this.sanitizer.bypassSecurityTrustUrl(
  //         urlCreator.createObjectURL(response)
  //       );
  //     })
  //   );
  // }
  // getImageBase64FromBackEnd(urlPart: string) {
  //   return this.Get(urlPart)
  //     .pipe
  //     // ?tap(response => console.log(response))
  //     ();
  // }
  // getImageBase64FromBackEnd2(urlPart: string) {
  //   return this.Get2(urlPart)
  //     .pipe
  //     // ?tap(response => console.log(response))
  //     ();
  // }

  // getByPostImageBase64FromBackEnd(urlPart: string, params: any) {
  //   return this.add(params, urlPart)
  //     .pipe
  //     // tap(response => console.log(response))
  //     ();
  // }

  // postImage(fileToUpload: File, urlPart: string): Observable<boolean> {
  //   const endpoint = this.getUrl(urlPart);
  //   console.log(fileToUpload);
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: this.getBlobHeaders() })
  //     .pipe(
  //       map(() => {
  //         return true;
  //       }),
  //       catchError((e) => this.handleError(e))
  //     );
  // }

  // handleError(err: HttpErrorResponse): Observable<any> {
  //   if (err.error instanceof Error) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', err.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${err.status}, body was: ${err.error}`
  //     );
  //   }

  //   // ...optionally return a default fallback value so app can continue (pick one)
  //   // which could be a default value
  //   // return of<any>({my: "default value..."});
  //   // or simply an empty observable
  //   return of<any>({ file: null });
  // }
}
