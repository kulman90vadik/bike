
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
    token?: string;
    avatarUrl?: string;
}

export interface ProductProps {
  _id: string;
  name: string;
  flag: string;
  image: string;
  price: string;
  sale?: string;
  newproduct: boolean;
  basePrice: number;
  counter: number;
  viewsCount: number;
  category: string;
  country: string
}

export interface BasketProps {
  _id: string;
  category: string
  name: string;
  flag: string;
  image: string;
  sale?: string;
  price: string;
  basePrice: number;
  newproduct: boolean;
  counter: number;
  viewsCount: number;
  country: string
}


