console.log('rollup study')
import { readFileSync } from 'fs';


const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
console.log(`running version ${pkg.version}`);

// import { name, version } from '../package.json'
const fn = () => {
  setTimeout(() => {
    console.log('1秒后执行的')
    console.log(pkg.name, pkg.version)
  }, 1000)
}

