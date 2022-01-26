import Url from 'url-parse';

const extractProtocol = (parsedProtocol: string) =>
  parsedProtocol.endsWith(':')
    ? parsedProtocol.substr(0, parsedProtocol.length - 1)
    : parsedProtocol;

export const parseUrl = (url: string) => {
  const parsedUrl = new Url(url, true);
  return {
    protocol: extractProtocol(parsedUrl.protocol),
    hostname: parsedUrl.hostname,
    params: parsedUrl.query,
    pathname: parsedUrl.pathname,
    origin: parsedUrl.origin,
  };
};
