import { environment } from '../../environments/environment';

export const NetworkDelay = {
  GPRS: 500, // GPRS
  Regular2G: 200, // Regular 2G
  Good2G: 150, // Good 2G
  Regular3G: 100, // Regular 3G
  Good3G: 40,  // Good 3G
  Regular4G: 20,  // Regular 4G
  DSL: 5,   // DSL
  WIFI: 2    // WIFI
};

export const NetworkCondition = {
  GPRS: 100,
  Regular2G: 200,
  Good2G: 300,
  Regular3G: 400,
  Good3G: 500,
  Regular4G: 600,
  DSL: 700,
  WIFI: 800
};

export const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000
}

export const ResourceBase = environment.resoucePath;

export const DefaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
  Accept: 'application/json',
};

export const LocalStorageKeyEnum = {
  SESSION: 'ngkoa.blog.session',
}



