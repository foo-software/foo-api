import querystring from 'querystring';

export const getQueryString = (parameters: any = {}) =>
  !Object.keys(parameters).length
    ? ''
    : `?${querystring.encode({ ...parameters })}`;
