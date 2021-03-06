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
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
};

export const ResourceBase = environment.resourcePath;

export const DefaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
  Accept: 'application/json',
};


export const Trusted = {
  icon: (name: string, color: string = 'white', size: number = 24) => `assets/icons/ic_${name}_${color}_${size}px.svg`,
}

export const LocalStorageKeyEnum = {
  SESSION: 'ngkoa.blog.session',
};

export const Message = {
  1000: '你没有操作的权限',
  1001: '你已经登陆了',
  1002: '登出失败！',
  2000: '没有找到你想要的内容',
  3000: '文章必须有标题',
  3001: '文章必须有内容',
  3003: '文章发布成功',
  3099: '文章内容不完整，无法发布'
};



