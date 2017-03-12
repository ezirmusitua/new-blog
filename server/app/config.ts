import fs from 'fs';
const prodConfigFile = '../config.prod.json';
const devConfigFile = '../config.json';
const Envs = ['prod', 'production'];
function noFilesExists(files: string[]) {
  return !files.reduce((existsCount, filename) => {
    existsCount += fs.existsSync(filename) ? 1 : 0;
    console.log(filename, fs.existsSync(filename));
    return existsCount;
  }, 0);
}
export function readConfigFile(env: string) {
  return Envs.indexOf(env) > -1 ? require(prodConfigFile) : require(devConfigFile);
}
