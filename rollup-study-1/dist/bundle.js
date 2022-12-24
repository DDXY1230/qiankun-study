(function (fs) {
  'use strict';

  console.log('rollup study');


  const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', (document.currentScript && document.currentScript.src || new URL('bundle.js', document.baseURI).href)), 'utf8'));
  console.log(`running version ${pkg.version}`);

})(fs);
