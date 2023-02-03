import { Layout, Tile, Section, Menu, Role } from './layout.interface';

export const initLayout: Layout = {
  button: 'btn waves-effect waves-light box-shadow',
  backgroundColour: '',
  colour: 'green',
  buttonSmall: 'waves-effect waves-light btn btn-small',
  iconColor: 'material-icons',
  textColour: 'text',
  style: 'border-color',
  navColour: 'nav-wrapper',
  btnFloating: 'btn-floating',
  pixel: '7px solid',
  cardContent: 'card-content',
  tab: 'tab btn',
  cardheader: 'card-header',
  detailcard: 'info-box hover-zoom-effect',
  AGtheme: 'ag-theme',
  cpanel: 'card-panel z-depth-1 cpanel',
};

export const initTile: Tile = {
  id: '',
  name: '',
  image: '',
  link: '',
  sublink1: '',
  sublink2: '',
  sublink1Title: '',
  sublink2Title: '',
  postion: 0,
  section: '',
  securable: '',
  amount: 0,
  dateType: '',
  volume: 0,
};

export const initSection: Section = {
  id: '',
  name: '',
  position: 0,
  securable: '',
};

export const initMenu: Menu = {
  id: '',
  name: '',
  code: '',
  icon: '',
  route: '',
  cardheader: '',
  module: '',
  cssClass: '',
  cssClasses: '',
  roles: [],
  securables: [],
  children: [],
};
export const initRole: Role = {
  id: '',
  name: '',
  permissions: [],
  users: [],
};
