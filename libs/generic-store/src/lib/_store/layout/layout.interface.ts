import { RolePermission, SecurableEnum, UserRole } from '../role';

export interface Layout {
  button: string;
  colour: string;
  textColour: string;
  backgroundColour: string;
  buttonSmall: string;
  iconColor: string;
  style: string;
  navColour: string;
  btnFloating: string;
  pixel: string;
  cardContent: string;
  tab: string;
  cardheader: string;
  detailcard: string;
  AGtheme: string;
  cpanel: string;
}

export interface Tile {
  id: string;
  name: string;
  section: string;
  image: string;
  link: string;
  sublink1: string;
  sublink2: string;
  sublink1Title: string;
  sublink2Title: string;
  postion: number;
  securable: string;
  amount: number;
  dateType: string;
  volume: number;
}

export interface Section {
  id: string;
  name: string;
  position: number;
  securable: string;
}

export interface Menu {
  id: string;
  name: string;
  code: string;
  icon: string;
  route: string;
  cardheader: string;
  module: string;
  cssClass: string;
  cssClasses: string;
  roles: Role[];
  securables: MenuSecurables[];
  children: MenuChild[];
}
export interface MenuChild {
  id: string;
  name: string;
  code: string;
  icon: string;
  route: string;
  cardheader: string;
  module: string;
  cssClass: string;
  cssClasses: string;
  roles: Role[];
  securables: MenuSecurables[];
}
export interface Role {
  id: string;
  name: string;
  users: UserRole[];
  permissions: RolePermission[];
}

export interface MenuSecurables {
  id: string;
  securable: SecurableEnum;
}
export interface MenuInput {
  menus: Menu[];
  tiles: Tile[];
  sections: Section[];
}
