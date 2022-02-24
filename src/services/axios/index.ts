import axios from 'axios';

import { setupInterceptorsTo } from './interceptors';


const instance =  setupInterceptorsTo(axios.create({
  baseURL: 'https://api.github.com'
}));

export default instance;
