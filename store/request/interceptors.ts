import Router from 'next/router';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// import { getCookie } from 'helpers/cookieHelpers';

// import { getCookie, setCookie, deleteCookie } from 'helpers/cookieHelpers';
// import endpoints from 'constants/endpoints';

// import { errObject } from 'helpers/reduxHelpers';
// import { useDispatch } from 'react-redux';
// import { customerActions } from 'store';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // const accessToken = getCookie('accessToken');
  const accessToken: null = null;
  if (accessToken && accessToken !== 'null') {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete config.headers['Authorization'];
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: any): Promise<any> => {
  // dispatch(customerActions.postTokenWebLoginFailure(errObject(error.response)));
  console.log('error.response:>> ', error.response);
  if (!error.response) {
    return {
      status: 503,
      data: null,
      problem: 'Network Error',
    };
  }
  if (error.response) {
    console.log('401 :>> ', error.response);
    if (
      error.response.status === 403 ||
      error.response.data === 'No SecurityTokenValidator available for token.'
    ) {
      Router.push('/login');
    }
    if (error.response.status === 401) {
      // Access Token was expired
      // const accessToken = getCookie('accessToken');
      // const refreshToken = getCookie('refreshToken');
      // try {
      //   const refreshResponse = await axios.post(
      //     endpoints.TOKEN_WEB.POST_TOKEN_WEB_REFRESH_SERVICE(),
      //     {
      //       RefreshToken: refreshToken,
      //       AccessToken: accessToken,
      //     },
      //   );

      //   if (refreshResponse?.data) {
      //     const { AccessToken, RefreshToken } = refreshResponse.data;
      //     setCookie('accessToken', AccessToken);
      //     setCookie('refreshToken', RefreshToken);
      //     return refreshResponse.data;
      //   }

      //   Router.push('/login');
      //   return false;
      // } catch (_error) {
      //   deleteCookie('accessToken');
      //   deleteCookie('refreshToken');
      //   Router.push('/login');
      //   return Promise.reject(_error);
      // }
      Router.push('/login');
    }
  }
  return error.response;
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
  withHeader: boolean = true,
): AxiosInstance => {
  if (withHeader) {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
  }
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
