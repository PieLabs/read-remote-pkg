import * as RegClient from 'npm-registry-client';
import * as semver from 'semver';

import { KeyValue, Viewer } from './index';

import { buildLogger } from 'log-factory';

const logger = buildLogger();


const client = new RegClient({});

let toRegistryPath = (pattern: KeyValue): string => {
  return encodeURI(`${pattern.key}/${pattern.value}`);
};

export class Npm implements Viewer {

  match(pattern: KeyValue): boolean {
    let s = semver.validRange(pattern.value, true);
    let match = pattern.value === '*' || s !== null;
    logger.silly('[match] ', match, pattern, s);
    return match;
  }

  view(pattern: KeyValue): Promise<any | undefined> {

    logger.info('[view] pattern: ', pattern);

    return new Promise((resolve, reject) => {
      let path = toRegistryPath(pattern);
      client.get(`http://registry.npmjs.org/${path}`, { timeout: 1000 }, (err, data) => {
        if (err) {
          logger.debug('[view] err: ', err);
          resolve(undefined);
          return;
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default new Npm();
