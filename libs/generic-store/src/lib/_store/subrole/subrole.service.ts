import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subrole } from './subrole.interface';
import { BaseServiceService } from '@infusync-frontend/infusync-service';

@Injectable()
export class SubroleService {
  api = 'UserSubRoles';
  api2 = 'RoleCategories';
  constructor(private baseService: BaseServiceService) {}

  public getSubroles = (): Observable<Subrole[]> => {
    return this.baseService.get(this.api + '/GetAll');
  };

  public getSubrole = (subroleId: string): Observable<Subrole> => {
    return this.baseService.get(this.api + '/GetById/' + subroleId);
  };

  public addSubrole = (subrole: Subrole): Observable<Subrole> => {
    return this.baseService.post(subrole, this.api + '/add');
  };

  public updateSubrole = (subrole: Subrole): Observable<Subrole> => {
    return this.baseService.put(subrole, this.api + '/Update');
  };

  public searchSubrole = (query: string): Observable<any> => {
    return this.baseService.get(this.api + '/ddlSearchSubRole/' + query);
  };

  public subroleCategory = (): Observable<any> => {
    return this.baseService.get(this.api2 + '/GetAll');
  };
}
