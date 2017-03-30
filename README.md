# read-remote-pkg 

Read the package.json of an npm module without installing it. Supports reading it from npmjs.com, github, and from the local file-system.


```javascript

/**
 * 
 */
import readRemotePkg from 'read-remote-pkg';

Promise.all([
  //with a semver
  readRemotePkg('my-pkg', '^1.0.0', dir);
  //with a github name 
  readRemotePkg('my-pkg', 'my-org/my-pkg', dir);
  //with a github name 
  readRemotePkg('my-pkg', '../..', dir);
])
.then((packages) => {
  console.log(packages.map(p => p.name).join(', '));
});

```

# test

`npm test`

# build 

`npm run main`
