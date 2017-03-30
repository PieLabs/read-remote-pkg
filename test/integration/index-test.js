const { expect } = require('chai');

describe('read-remote-pkg', () => {

  const readRemotePkg = require('../../lib/index').default;

  before(() => {
  });

  it('reads from npm', () => {
    return readRemotePkg('log-factory', '^1.0.0', process.cwd())
      .then(pkg => {
        expect(pkg.name).to.eql('log-factory'); 
      });
  });

  it('reads from github', () => {
    return readRemotePkg('log-factory', 'PieLabs/log-factory#master', process.cwd())
      .then(pkg => {
        expect(pkg.name).to.eql('log-factory'); 
      });
  });
  
  it('reads from folder', () => {
    return readRemotePkg('log-factory', 'node_modules/log-factory', process.cwd())
      .then(pkg => {
        expect(pkg.name).to.eql('log-factory'); 
      });
  });
  
  it('does not read from file', () => {
    return readRemotePkg('log-factory', 'node_modules/log-factory/package.json ', process.cwd())
      .then(pkg => {
        expect(pkg).to.be.undefined;
      });
  });
});