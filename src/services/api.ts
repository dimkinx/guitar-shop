import axios, {AxiosInstance} from 'axios';
import {BACKEND_BASE_URL, REQUEST_TIMEOUT} from '../common/constants';

const createAPI = (): AxiosInstance => axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export {createAPI};
