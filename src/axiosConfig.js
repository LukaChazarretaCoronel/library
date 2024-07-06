// axiosConfig.js
import axios from 'axios';

// Configuración global de Axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Opcional: Interceptor para depurar los encabezados de la solicitud
axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Error Response:', error.response);
  return Promise.reject(error);
});

export default axios;
