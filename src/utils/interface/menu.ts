export interface MenuParent {
  title: string;
  menus: Array<Menu>;
}
export interface Menu {
  link: string;
  icon: string;
  name: string;
}
