import axios from 'axios';
const { X_API_KEY } = process.env;

const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    config.headers['x-api-key'] = X_API_KEY;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
