import * as _ from 'lodash';

import Local from './local';
import LocalFile from './local-file';
import { buildLogger } from 'log-factory';
import github from './github';
import npm from './npm';

const logger = buildLogger();


export interface Viewer {
  view(pattern: KeyValue): Promise<any | undefined>;
  match(pattern: KeyValue): boolean;
}

export type KeyValue = {
  key: string,
  value: string
};

export default function (key: string, value: string, dir: string) : Promise<{}> {

  const keyValue = { key , value };

  logger.debug('[read-remote-pkg] key: ', key, 'value: ', value, ' dir: ', dir);

  let viewers: Viewer[] = [
    new LocalFile(dir),
    new Local(dir),
    npm,
    github
  ];

  let compatible: Viewer[] = _.filter(viewers, v => v.match(keyValue));

  logger.debug('compatible: ', compatible);
  
  let out = _.reduce(compatible, (acc, v) => {
    logger.silly('[info] acc: ', acc);
    logger.silly('[info] v: ', v);
    return acc.then(r => {
      if (r !== undefined) {
        return r;
      } else {
        return v.view(keyValue);
      }
    });
  }, Promise.resolve(undefined));

  return out
    .catch(e => {
      logger.error(e);
      logger.error(e.stack);
      throw new Error(`unable to find info for package pattern: ${keyValue}`);
    });
};
