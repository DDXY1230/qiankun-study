interface ComplexObject {
  mandatory: string;
  option1?: number;
  option2?: boolean;
}
type GetOptional<T> = {
  // [P in keyof T as `get${P&string}`]: T[P];
  // P&string 确定P取出来是一个字符串,
  //因为ts会认为这有可能是个symbol
  
  
  // [P in keyof T as `get${Capitalize<P&string>}`]: T[P];
  // P&string 确定P取出来是一个字符串,因为ts会认为这有可能是个symbol,取出值,
  //并且第二个单词首字母大写

  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
  //   取出可选的属性


}
let keys: GetOptional<ComplexObject>;
// keys.getMandatory
// keys.