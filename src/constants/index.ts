export interface AuthFields {
  name: string;
  placeholder: string;
  type: string;
}

export const loginTextFields: AuthFields[] = [
  { name: 'email', placeholder: 'Введите ваш E-mail', type: 'email' },
  { name: 'password', placeholder: 'Введите ваш пароль', type: 'password' },
];
export const registerTextFields: AuthFields[] = [
  { name: 'userName', placeholder: 'Введите ваш имя', type: 'text' },
  { name: 'email', placeholder: 'Введите ваш E-mail', type: 'email' },
  { name: 'password', placeholder: 'Введите ваш пароль', type: 'password' },
];

export interface ISortList {
  name: string;
  order: string;
}

export const sortList: ISortList[] = [
  { name: 'Новые', order: '' },
  { name: 'Популярные', order: 'desc' },
];
