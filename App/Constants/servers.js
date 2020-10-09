import {DEVELOP_MODE} from '../Common/config';

export const SERVERS = [
  'app.brew9.co/',
  'uat.brew9.co/',
  'dev1.brew9.co/',
  'dev2.brew9.co/',
  'dev3.brew9.co/',
  'dev4.brew9.co/',
  'dev5.brew9.co/',
  'dev6.brew9.co/',
  'dev7.brew9.co/',
  'dev8.brew9.co/',
  'dev9.brew9.co/',
  'dev10.brew9.co/',
];
export const PRODUCTION_SERVER = 'app.brew9.co/';
export const DEVELOPMENT_SERVER = 'uat.brew9.co/';
export const DEFAULT_SERVER = DEVELOP_MODE
  ? DEVELOPMENT_SERVER
  : PRODUCTION_SERVER;
export const PROTOCOLS = ['https://'];
export const DEFAULT_PROTOCOL = 'https://';
