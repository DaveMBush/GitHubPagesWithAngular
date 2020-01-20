export interface NavItemInterface {
  name: string;
  type: string;
  location: string;
  children: Array<NavItemInterface>;
}
