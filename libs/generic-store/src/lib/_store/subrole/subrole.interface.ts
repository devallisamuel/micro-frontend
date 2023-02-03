// import { ApplicationModule } from '..';

export interface Subrole {
  id: string;
  name: string;
  description: string;
  applicationModules: any[];
  instanceType: string;
  tenantId: string;
  infusyncId: string;
  createDate: string;
  updateDate: string;
  createdBy: string;
  status: string;
  roleCategoryName: string;
}
