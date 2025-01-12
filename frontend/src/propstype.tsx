
export type NavigationItem = {
  lebel: string;  
  link: string;
};

export type PropsNav = {
  navigation: NavigationItem[];
  classNameNav: string;
};


export interface FormValueslogin {
  password: string;
  email: string;
}
export interface FormValuesRegister {
  password: string;
  email: string;
  fullName: string;
}


export interface Registerprops {
  _id: string;
  password: string;
  email: string;
  fullName: string;
  token: string;
  avatarUrl?: string;
}



// export interface AuthResponse {
//   // Укажите поля, которые ожидаете от ответа
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
// }