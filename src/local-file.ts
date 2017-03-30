import { KeyValue, Viewer } from './index';
import { existsSync, statSync } from 'fs-extra';
import { extname, join } from 'path';

import { buildLogger } from 'log-factory';

const logger = buildLogger();

export default class LocalFile implements Viewer {

  constructor(private cwd: string) { }

  match(pattern: KeyValue): boolean {
    return (extname(pattern.value) && existsSync(join(this.cwd, pattern.value))) ? true : false;
  }

  view(pattern: KeyValue): Promise<any | undefined> {
    logger.info('[view], pattern: ', pattern);
    return Promise.resolve(undefined);
  }
}