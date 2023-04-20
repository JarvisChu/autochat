import { extend } from 'umi-request';
import { message } from 'antd';
//import { PathConfig } from '../../config/router.config';
import { history } from 'umi';
import { getToken, removeToken } from './token';

interface IRequestConfig {
  path: string;
  params?: any;
  data?: any;
}
// import { history } from 'umi';

/*
const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '账号登录已失效，请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
*/
const codeMessage: any = {};

/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  console.log("err:", error);
  const { response, data } = error;
  if (response && response.status) {
    if (response.status === 200) {
      return;
    }
    const errorText = codeMessage[response.status] || data.msg;
    const { status, url } = response;
    message.error({ key: errorText, content: errorText });
    if (status === 401) {
      removeToken();
      history.push('/login');
    }
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }

  return {};
};
/**
 * 配置request请求时的默认参数
 */
const umiRequest = extend({
  errorHandler,
  // 默认错误处理
  crossOrigin: false, // 开启CORS跨域
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
// 中间件，对请求前添加 userId token 的基础参数
umiRequest.interceptors.request.use((url, options) => {
  const newOptions = { ...options };
  newOptions.headers = {
    ...newOptions.headers,
    Authorization: `Bearer ${getToken()}`,
  };
  return {
    url: `${url}`,
    options: { ...newOptions },
  };
});

const request = {
  get: (opts: IRequestConfig) => {
    return umiRequest(opts.path, {
      ...opts,
      method: 'get',
    });
  },
  post: (opts: IRequestConfig) => {
    return umiRequest(opts.path, {
      ...opts,
      method: 'post',
    });
  },
  patch: (opts: IRequestConfig) => {
    return umiRequest(opts.path, {
      ...opts,
      method: 'patch',
    });
  },
  delete: (opts: IRequestConfig) => {
    return umiRequest(opts.path, {
      ...opts,
      method: 'delete',
    });
  },
  put: (opts: IRequestConfig) => {
    return umiRequest(opts.path, {
      ...opts,
      method: 'put',
    });
  },
};

export default request;
