import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quick-parks-grow.loca.lt',
});

export default api;