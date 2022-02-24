import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // Do something before request is sent
  // console.info(`[request]:: `, config);
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // Do something with request error
  console.error(`Erro na requisição da API:: `, error);
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  if(response.data.hasError) {
    console.error(`Erro na resposta da API:: `, response);
    console.warn(`- ${response.data?.messages}`);
    const { messages } = response.data;
    if(messages && typeof messages === 'object' && Array.isArray(messages) && messages?.length > 0) {
      response.data?.messages.forEach((message: string) => {
        console.warn(message);
      });
    }
  }
  return response;
}

const onResponseError = (axiosError: AxiosError): Promise<AxiosError> => {
  // const history = useHistory();
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(!!axiosError.response?.data) {
    const { error, message, statusCode } = axiosError.response?.data
    switch(statusCode) {
      case 400: {
        console.group(`Erro[${statusCode}] Campo(s) obrigatório(s)`);
        message.forEach((error: string) => {
          console.error(error);
        });
        console.groupEnd();
        break;
      }
      case 401: {
        console.error(`Erro[${statusCode}] Você precisa fazer login`);
        // should redirect to /login
        break;
      }
      default: {
        console.error(`Erro[${statusCode}]:: `, axiosError.response?.data);
        break;
      }
    }
    if(message && typeof message === 'object' && Array.isArray(message) && message?.length > 0) {
      message.forEach((msg: string) => {
        console.warn(msg);
      });
    }
  }
  return Promise.reject(axiosError);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
