import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'developmentUrl' : 'productionUrl',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
