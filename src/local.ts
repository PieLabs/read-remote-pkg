import { KeyValue, Viewer } from './index';
import { readJson, statSync } from 'fs-extra';

import { buildLogger } from 'log-factory';
import { join } from 'path';

const logger = buildLogger();

export default class Local implements Viewer {

  constructor(private cwd: string) { }

  private pkgPath(pattern: KeyValue): string {
    return join(this.cwd, pattern.value, 'package.json');
  }

  match(pattern: KeyValue): boolean {
    let pkg = this.pkgPath(pattern);
    try {
      let stat = statSync(pkg);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

  view(pattern: KeyValue): Promise<any | undefined> {

    logger.info('[view], pattern: ', pattern);
    if (!this.match(pattern)) {
      return Promise.reject(new Error('match failed'));
    } else {
      let pkg = this.pkgPath(pattern);
      return new Promise((resolve, reject) => {
        readJson(pkg, (err, data) => {
          if (err) {
            resolve(undefined);
            return;
          }
          logger.silly('[view] data: ', data);
          resolve(data);
        });
      });
    }
  }
}