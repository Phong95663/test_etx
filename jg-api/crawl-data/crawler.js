// const wanakana = require('wanakana');
const Kuroshiro = require("kuroshiro")
const analyzer = require("kuroshiro-analyzer-kuromoji")
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Grammar = require('./model');

const kuroshiro = new Kuroshiro();
kuroshiro.init(new analyzer());

(async () => {
  // const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const browser = await puppeteer.launch({ slowMo: 250 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1800 });
  // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://mazii.net/#!/search');
  await page.click('#tab3');
  await page.click('.box-select>div:nth-child(1)');
  // await page.waitFor(3000);
  await page.click('.select-level>div:nth-child(6)');
  // await page.waitFor(3000);
  for (let i = 0; i < 16; i++) {
    console.log(`Page: ${i}`);
    await getData(page);
    await page.waitFor(2000);
    await page.click('div.box-pagination>ul>li:nth-child(8)');
  }
  await browser.close();

})();

let getData = async (page) => {
  for (let i = 1; i < 13; i++) {
    try {
      await page.waitForSelector(`.box-card:nth-child(${i})`);
      console.log(i);
      await page.click(`.box-card:nth-child(${i})`);
      await page.waitForSelector('.grammar-item-title');
      await page.waitForSelector('.close-modal-jlpt');
      const grammar = await page.evaluate(() => {
        const title = document.querySelector('.grammar-item-title').textContent;
        const mean = document.querySelector('.grammar-item-title-mean').textContent;
        var use = '';
        if (document.querySelector('.gr-use-syn-item') != null) {
          use += document.querySelector('.gr-use-syn-item').textContent;
        }
        const explain = document.querySelector('.gr-explain-note').textContent;
        const examples = [];
        const examples_ele = document.querySelectorAll('.japanese-char');
        const examples_mean = document.querySelectorAll('.example-mean-word');
        const count_example = examples_ele.length;
        for (var i = 0; i < count_example; i++) {
          let count_child_ja = examples_ele[i].children.length;
          let ex_ja = '';
          if (examples_ele[i].hasAttribute('ng-bind-html')) {
            ex_ja = examples_ele[i].textContent.trim();
          }
          else {
            for (var j = 0; j < count_child_ja; j++) {
              ex_ja += examples_ele[i].children[j].firstChild.textContent.trim();
            }
          }
          let ex_vi = examples_mean[i].textContent.trim();
          examples.push({
            ja: ex_ja,
            vi: ex_vi
          })
        }
        document.querySelector('.close-modal-jlpt').click();
        return {
          title: title,
          mean: mean,
          use: use,
          explain: explain,
          examples: examples
        };
      });
      let titleKana = await convertTitle(grammar.title);
      grammar['titleKana'] = titleKana;
      console.log(grammar);
      insert(grammar);
    } catch (error) {
      console.log(error);
    }
  }
}

let insert = (Obj) => {

  const DB_URL = 'mongodb://localhost:27017/grammar';

  if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL); }

  let conditions = { title: Obj.title };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Grammar.findOneAndUpdate(conditions, Obj, options, (err, result) => {
    if (err) throw err;
  });
}

let convertTitle = async (str) => {
  const res = await kuroshiro.convert(str, { to: "katakana" });
  return res;
}
