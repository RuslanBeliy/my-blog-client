import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-blog-ckvh.onrender.com/api',
});

export { instance as axios };
