#!/usr/bin/env node

var chalk = require('chalk'),
pkgUp = require('pkg-up'),
fs = require('fs'),
axios = require('axios'),
figlet = require('figlet');
(async () => {
const pkgPath = await pkgUp()
if (pkgPath == null) throw new Error('No package.json found.')
fs.readFile(pkgPath, 'utf8', (err, data) => { 
if(err) throw err
var pkgs = JSON.parse(data),
pcks =  [].concat(deps(pkgs,'dependencies'),deps(pkgs, 'devDependencies'));
figlet('Thanks to Maintainers', (err, data) =>  {
console.log(chalk.yellow(data))
console.log(chalk.red(' Many authors devote countless hours to open source. Lets help out authors and make the software we rely on healthier at the same time! ' ))
console.log('\n You Are using ' + chalk.yellow.bold(pcks.length) + ' packages in your project \n')
pcks.forEach(pkg => {
axios.get(`http://registry.npmjs.com/${pkg}/latest`).then((response)=> {
console.log(chalk.green.bold(pkg) + chalk.bold(' By ') + response.data.maintainers[0].name + ' Repo: ' + response.data.repository.url)
})
})
})
})})();


function deps(pkg,depType){
return pkg[depType] && typeof pkg[depType] === 'object'? Object.keys(pkg[depType]): []
}

