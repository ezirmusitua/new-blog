const prodConfigFile = '../config.prod.json';
const devConfigFile = '../config.json';
const Envs = ['prod', 'production'];

export function readConfigFile(env: string): void {
  /* tslint:disable no-var-requires no-require-imports */
  return Envs.indexOf(env) > -1 ? require(prodConfigFile) : require(devConfigFile);
}
