import { DEVELOP_MODE } from "../Common/config";

const SERVERS = [
  'app.brew9.co/',
  'dev.brew9.co/',
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
const PRODUCTION_SERVER = 'app.brew9.co/'
const DEVELOPMENT_SERVER = 'dev7.brew9.co/';
const DEFAULT_SERVER = DEVELOP_MODE ? DEVELOPMENT_SERVER: PRODUCTION_SERVER;
const PROTOCOLS = ['https://'];
const DEFAULT_PROTOCOL = 'https://';

export { SERVERS, DEFAULT_SERVER, PROTOCOLS, DEFAULT_PROTOCOL };
