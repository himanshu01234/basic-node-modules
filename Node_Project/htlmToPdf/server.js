const puppeteer= require('puppeteer');
const fs= require('fs-extra');

(async function(){
    try{

const browser=await puppeteer.launch();
const page = await browser.newPage();

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var words = require("./html/file");


await page.setContent(words)
await page.emulateMedia('screen')
await page.pdf({
    path:'converted.pdf',
    format:'A4',
    printBackground:true
})
console.log("Converted");
await browser.close();
process.exit();
    }
    catch(error)
    {
console.log("Error found",error)
    }
})();