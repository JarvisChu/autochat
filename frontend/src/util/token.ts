import Cookies from 'js-cookie';

const COOKIE_TOKEN_KEY = 'qsToken';

const getCookieDomain = () => {
  const hostname = window.location.hostname;
  const index = hostname.indexOf('.qike');
  if (index > -1) {
    return hostname.slice(index);
  } else {
    return hostname;
  }
};

export const getToken = () => {
  const cookie = Cookies.get(COOKIE_TOKEN_KEY);
  return cookie;
};

export const setToken = (token: string) => {
  const domain = getCookieDomain();
  Cookies.set(COOKIE_TOKEN_KEY, token, { domain });
};

export const removeToken = () => {
  Cookies.remove(COOKIE_TOKEN_KEY);
};
