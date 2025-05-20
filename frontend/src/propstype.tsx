
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
  avatarFile?: FileList;
  avatarUrl?: string;
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
  productId?: string;
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
  country: string;
  description: string;
  comments: IComment[];
}

export interface IComment {
  user: string, 
  _id: string, 
  fullName: string,
  avatarUrl: string,
  text: string;
  rating: number;
  date?: Date;
  likesUp: likesUp[];
  likesDown: likesDown[],
}

export interface likesUp {
  user: string, 
  like: boolean
}

export interface likesDown {
  user: string, 
  like: boolean
}


export interface BasketProps {
  _id: string;
  productId?: string;
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
  country: string;
  description: string;

  comments: IComment[];
}


export interface FormReview {
  text: string
}

export interface PropsEditComment {
  productId: string;
  reviewId: string;
  text: string;
  rating: number;
  isEdit: boolean;
}