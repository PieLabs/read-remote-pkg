import * as _ from 'lodash';

import { assert, match, spy, stub } from 'sinon';

import { expect } from 'chai';
import proxyquire from 'proxyquire';

const ROOT = '../../lib';

describe('local', () => {
  let npm, localFile, deps, regClient, result, pkg;

  beforeEach(() => {
    pkg = {
      dependencies: {
        a: '1.0.0' 
      }
    }
    
    regClient = {
      get: stub().yields(null, pkg)
    }

    deps = {
      'fs-extra': {
        existsSync: stub().returns(true),
      },
      'npm-registry-client': stub().returns(regClient)
    };
    npm = proxyquire(`${ROOT}/npm`, deps).default;
  });

  describe('match', () => {

    it('matches a valid semver', () => {
      expect(npm.match({ key: 'dep', value: '1.0.0' })).to.be.true;
    });

    it('matches *', () => {
      expect(npm.match({ key: 'dep', value: '*' })).to.be.true;
    });

    it('does not match a path', () => {
      expect(npm.match({ key: 'dep', value: 'path/to' })).to.be.false;
    });

  });

  describe('view', () => {

    beforeEach(() => {
      return npm.view({ key: 'dep', value: '1.0.0' }, 'dependencies')
        .then(r => result = r);
    });

    it('calls npm-registry-client.get', () => {
      assert.calledWith(regClient.get,
        `http://registry.npmjs.org/dep/1.0.0`,
        { timeout: 1000 }, match.func);
    });

    it('returns the data', () => {
      expect(result).to.eql(pkg);
    });
  });
});
