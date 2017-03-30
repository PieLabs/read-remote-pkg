import { assert, match, spy, stub } from 'sinon';

import _ from 'lodash';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

describe('package-info', () => {
  let readRemote, local, localFile, deps;

  let some = (data) => Promise.resolve(data);

  let getReadRemote = (deps) => {

    local = {
      match: stub().returns(false),
      view: stub().returns(some({}))
    }

    deps = _.extend({
      './local': {
        default: local
      },
      './npm': {
        default: {
          match: stub().returns(false),
          view: stub().returns(some({})),
        }
      },
      './github': {
        default: {
          match: stub().returns(false),
          view: stub().returns(some({}))
        }
      }
    }, deps);

    let mod = proxyquire('../../lib/index', deps);
    return { readRemote: mod.default, deps };
  }

  describe('info', () => {

    let result;

    describe('with local result', () => {
      beforeEach((done) => {

        let out = getReadRemote();
        readRemote = out.readRemote;
        deps = out.deps;

        local.match.returns(true);
        local.view.returns(some('local-yes'));

        readRemote('key', 'value', 'cwd')
          .then(r => {
            result = r;
            done();
          })
          .catch(done);
      });

      it('return local result', () => {
        expect(result).to.eql('local-yes');
      });

      it('call local.view', () => {
        assert.called(local.view);
      });

      it('does not call npm.view', () => {
        assert.notCalled(deps['./npm'].default.view);
      });
    });

    describe('with npm result', (done) => {
      let deps;
      beforeEach((done) => {
        deps = {
          './npm': {
            default: {
              match: stub().returns(true),
              view: stub().returns(some('npm-yes'))
            }
          }
        };

        let o = getReadRemote(deps);
        deps = o.deps;
        readRemote = o.readRemote;
        readRemote('key', 'value', 'cwd')
          .then(r => {
            result = r;
            done();
          })
          .catch(done);
      });

      it('calls local.match', () => {
        assert.called(local.match);
      });

      it('calls npm.match', () => {
        assert.called(deps['./npm'].default.match);
      });

      it('calls npm.view', () => {
        assert.called(deps['./npm'].default.view);
      });

      it('returns npm result', () => {
        expect(result).to.eql('npm-yes');
      });
    });
  });
});