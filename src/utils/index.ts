export const textСropping = (txt: string, length: number) => {
  return txt.length < length ? txt : txt.slice(0, length) + '...';
};

export const getTokenLS = () => {
  const token = localStorage.getItem('token') || '';
  return token;
};

export const setTokenLS = (token: string) => {
  localStorage.setItem('token', token);
};

export const cutFirstLetter = (name: string) => {
  return name
    .split(' ')
    .reduce((acc, el) => (acc += el.slice(0, 1).toUpperCase()), '')
    .slice(0, 2);
};
