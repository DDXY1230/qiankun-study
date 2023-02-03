export interface ListInt {
  id: number,
  nikename: string,
  userName: string,
  role:RoleInt[],
}
interface RoleInt{
  role: number,
  roleName: string
}
interface SelectDataInt {
  nikeName: string,
  role:number
}
interface RoleListInt {
  roleName: string,
  roleId: number,
  suthorty: number
}
export class InitData {

}