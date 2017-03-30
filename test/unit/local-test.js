import * as _ from 'lodash';

import { assert, match, spy, stub } from 'sinon';

import { expect } from 'chai';
import proxyquire from 'proxyquire';

const ROOT = '../../lib';

let stat = (isFile) => {
  isFile = isFile === undefined ? false : true;

  return {
    isFile: stub().returns(isFile),
  }
}

describe('local', () => {
  let local, deps;

  beforeEach(() => {
    deps = {
      'fs-extra': {
        statSync: stub().returns(stat()),
        readJson: stub().returns({})
      }
    };

    local = proxyquire(`${ROOT}/local`, deps).default;
  });

  describe('match', () => {

    describe('with matching local package.json', () => {

      let statSync, result;

      beforeEach(() => {
        statSync = deps['fs-extra'].statSync;
        statSync.returns(stat(true));
        result = local.match({ key: 'any', value: '../..' });
      });

      it('calls statSync', () => {
        assert.calledWith(statSync, '../../package.json');
      });

      it('matches', () => {
        expect(result).to.eql(true);
      });
    });

    describe('with missing local package.json', () => {

      let statSync, result;

      beforeEach(() => {
        statSync = deps['fs-extra'].statSync;
        result = local.match({ key: 'any', value: '../..' });
      });

      it('calls statSync', () => {
        assert.calledWith(statSync, '../../package.json');
      });

      it('does not match', () => {
        expect(result).to.eql(false);
      });
    });
  });

  describe('view', () => {

    let fsExtra, result;

    beforeEach(() => {
      fsExtra = deps['fs-extra'];
    });

    describe('with missing package.json', () => {
      let error;
      beforeEach(() => {
        local.match = stub().returns(false);
        fsExtra.readJson.yields(null, { dependencies: { a: '1.0.0' } })
        return local.view({ key: 'any', value: '../..' }, 'dependencies')
          .then(r => result = r)
          .catch(e => error = e);
      });

      it('gets an error if match fails', () => {
        expect(error).not.to.be.undefined;
      });
      

      it('returns undefined', () => {
        expect(result).to.be.undefined;
      });
    });

    describe('with found package.json', () => {

      let pkg;
      beforeEach(() => {
        pkg = { dependencies: { a: '1.0.0' } };
        fsExtra.statSync.returns(stat(true));
        fsExtra.readJson.yields(null, pkg);
        return local.view({ key: 'any', value: '../..' }, 'dependencies')
          .then(r => result = r);
      });

      it('calls readJson', () => {
        assert.calledWith(fsExtra.readJson, local.pkgPath({ value: '../..' }))
      });

      it('returns the data', () => {
        expect(result).to.eql(pkg);
      });
    });

  });
});